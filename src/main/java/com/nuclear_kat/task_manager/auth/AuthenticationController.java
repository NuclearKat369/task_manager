package com.nuclear_kat.task_manager.auth;

import com.nuclear_kat.task_manager.auth.token.refresh.*;
import com.nuclear_kat.task_manager.dto.ChangePasswordDto;
import com.nuclear_kat.task_manager.security.JwtService;
import com.nuclear_kat.task_manager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    public JwtService jwtService;
    @Autowired
    public EmployeeService employeeService;
    @Autowired
    public RefreshTokenServiceImpl refreshTokenService;

    // Регистрация пользователя
    @PostMapping("/register")
    public ResponseEntity<Integer> register(
            @RequestBody RegisterRequestDto request, HttpServletResponse response) {
        System.out.println("register");
        return ResponseEntity.ok(authenticationService.register(request));
    }

    // Аутентификация пользователя
    @PostMapping("/authenticate")
    public AuthenticationResponseDto authenticate(
            @RequestBody AuthenticationRequestDto request, HttpServletResponse response) throws IOException {
        System.out.println("authenticate");
        AuthenticationResponseDto authRes = authenticationService.authenticate(request);
        Cookie refreshTokenCookie = new Cookie(
                "refreshToken", URLEncoder.encode(authRes.getRefreshToken(), "UTF-8"));
        refreshTokenCookie.setHttpOnly(true);
        response.addCookie(refreshTokenCookie);
        response.setStatus(HttpServletResponse.SC_OK);

        return authRes;
    }

    // Подтверждение почты
    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return authenticationService.confirmToken(token);
    }

    // Получение нового access-токена
    @GetMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(
            @CookieValue(name = "refreshToken") String token) {
        System.out.println("refresh-token: " + token);
        RefreshTokenRequest request = new RefreshTokenRequest(token);
        RefreshTokenResponse response = refreshTokenService.refreshToken(request);
        System.out.println("RESPONSE ON REFRESH: " + response);
        return ResponseEntity.ok(response);
    }

    // Выход из системы - удаление refresh-токена из БД
    @DeleteMapping("/logout")
    public ResponseEntity<Integer> logout(HttpServletRequest request) {
        return ResponseEntity.ok(refreshTokenService.deleteByEmployee(request));
    }

    @PutMapping("/change-password/{employeeId}")
    public int changePassword(@PathVariable String employeeId, @RequestBody ChangePasswordDto changePasswordDto) {
        int response = authenticationService.changeEmployeePassword(employeeId, changePasswordDto);
        System.out.println("response on changePassword" + response);
        return response;
    }
}