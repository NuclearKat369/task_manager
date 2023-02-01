package com.nuclear_kat.task_manager.auth;

import com.nuclear_kat.task_manager.auth.token.confirm.*;
import com.nuclear_kat.task_manager.auth.token.refresh.*;
import com.nuclear_kat.task_manager.dto.ChangePasswordDto;
import com.nuclear_kat.task_manager.email.EmailBuilder;
import com.nuclear_kat.task_manager.email.EmailValidator;
import com.nuclear_kat.task_manager.security.JwtService;
import com.nuclear_kat.task_manager.dao.EmployeeRepository;
import com.nuclear_kat.task_manager.email.EmailSender;
import com.nuclear_kat.task_manager.entity.Employee;
import com.nuclear_kat.task_manager.service.EmployeeService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmailValidator emailValidator;
    @Autowired
    private ConfirmationTokenServiceImpl confirmationTokenService;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private RefreshTokenServiceImpl refreshTokenService;
    @Autowired
    private EmailSender emailSender;
    @Autowired
    private EmailBuilder emailBuilder;

    // Регистрация с отправкой пиьсма на почту
    public int register(RegisterRequestDto request) {
        try {
            boolean isValidEmail = emailValidator.test(request.getEmail());
            if (!isValidEmail) {
                throw new IllegalStateException("Email not valid");
            }
            String jwt = employeeService.signUpEmployee(
                    new Employee(request.getLastName()
                            , request.getFirstName()
                            , request.getPatronymic()
                            , request.getEmail()
                            , passwordEncoder.encode(request.getPassword())));
            String link = "http://localhost:8080/auth/confirm?token=" + jwt;
            emailSender.send(request.getEmail(), emailBuilder.buildConfirmEmail(request.getFirstName(), link),
                    "Подтвердите ваш адрес электронной почты");
            return 1;
        } catch (IllegalStateException e) {
            return 0;
        }
    }

    // Аутентификация
    public AuthenticationResponseDto authenticate(AuthenticationRequestDto request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()));
        Employee employee = employeeRepository.findEmployeeByEmail(request.getEmail()).orElseThrow();
        String accessToken = jwtService.generateToken(employee);

        // Удаление старого refresh-токена
        if (refreshTokenRepository.findByEmployee(employee).isPresent()) {
            refreshTokenService.deleteByEmployee(employee);
            System.out.println("Old token deleted");
        }
        String refreshToken = jwtService.generateRefreshToken(employee);
        RefreshToken refreshTokenObject = new RefreshToken(
                refreshToken,
                LocalDateTime.ofInstant(jwtService.extractClaim(refreshToken, Claims::getExpiration).toInstant(), ZoneOffset.UTC),
                employee
        );
        refreshTokenRepository.save(refreshTokenObject);
        System.out.println("refreshTokenObject: " + refreshTokenObject);

        return AuthenticationResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshTokenObject.getToken())
                .employeeId(employee.getUuid())
                .email(employee.getEmail())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .patronymic(employee.getPatronymic())
                .roles(employee.getRoles())
                .build();
    }


    @Override
    public int changeEmployeePassword(String employeeId, ChangePasswordDto changePasswordDto) {
        Employee employee = employeeService.getEmployeeByUuid(UUID.fromString(employeeId));

        // TODO remove, for development
        if (employee.getPassword() == null) {
            employeeRepository.updatePassword(employee.getUuid(),
                    passwordEncoder.encode(changePasswordDto.getNewPassword()));
            return 3000;
        }
        // Проверка, совпадает ли текущий пароль с введённым
        if (passwordEncoder.matches(changePasswordDto.getCurrentPassword(),
                employee.getPassword())) {
            // Да, проверить, совпадает ли новый пароль с имеющимся
            if (passwordEncoder.matches(changePasswordDto.getNewPassword(),
                    employee.getPassword())) {
                return 2; // не изменён, совпадает
            } else {
                employeeRepository.updatePassword(employee.getUuid(),
                        passwordEncoder.encode(changePasswordDto.getNewPassword()));
                return 1; // изменён
            }
        }
        // Нет
        else {
            return 0;
        }
    }

    // Подтверждение почты, активация аккаунта
    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() -> new IllegalStateException("Token not found"));
        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();
        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        employeeService.enableEmployee(
                confirmationToken.getEmployee().getEmail());
        String link = "http://localhost:3000/login";
        return emailBuilder.buildConfirmed(confirmationToken.getEmployee().getEmail(), link);
    }
}
