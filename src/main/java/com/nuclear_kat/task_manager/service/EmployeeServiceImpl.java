package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.EmployeeRepository;
import com.nuclear_kat.task_manager.dto.EmployeeRegistrationDto;
import com.nuclear_kat.task_manager.entity.Employee;
import com.nuclear_kat.task_manager.entity.Role;
import com.nuclear_kat.task_manager.registration.token.ConfirmationToken;
import com.nuclear_kat.task_manager.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService, UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "Пользователь с почтой %s не найден";
    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

//    @Override
//    public Employee save(EmployeeRegistrationDto registrationDto) {
//        Employee employee =
//                new Employee(registrationDto.getLastName(), registrationDto.getFirstName()
//                        ,registrationDto.getPatronymic(), registrationDto.getEmail()
//                , registrationDto.getPassword(), Arrays.asList(new Role("Сотрудник")));
//
//        return employeeRepository.save(employee);
//
//    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return employeeRepository
                .findEmployeeByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG)));
    }

    public String signUpEmployee(Employee employee) {
        boolean employeeExists = employeeRepository.findEmployeeByEmail(employee.getEmail())
                .isPresent();
        if (employeeExists) {
            //TODO check if attributes are the same and
            //TODO if email not confirmed send confirmation email
            throw new IllegalStateException("Email already taken");
        }



        String encodedPassword = bCryptPasswordEncoder.encode(employee.getPassword());

        employee.setPassword(encodedPassword);

        employeeRepository.save(employee);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token
                , LocalDateTime.now()
                , LocalDateTime.now().plusMinutes(15)
                , employee
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        //TODO: send email

        return token;
    }

    public int enableEmployee(String email) {
        return employeeRepository.enableEmployee(email);
    }
}
