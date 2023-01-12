package com.nuclear_kat.task_manager.auth;

import com.nuclear_kat.task_manager.auth.token.refresh.*;
import com.nuclear_kat.task_manager.config.JwtService;
import com.nuclear_kat.task_manager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
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
    public RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) {
        System.out.println("register");
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public AuthenticationResponse authenticate(
            @RequestBody AuthenticationRequest request, HttpServletResponse response) throws IOException {
        System.out.println("authenticate");
        AuthenticationResponse authRes = authenticationService.authenticate(request);
        Cookie refreshTokenCookie = new Cookie(
                "refreshToken", URLEncoder.encode(authRes.getRefreshToken(), "UTF-8"));
        refreshTokenCookie.setHttpOnly(true);
        response.addCookie(refreshTokenCookie);
        response.setStatus(HttpServletResponse.SC_OK);

        return authRes;
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return authenticationService.confirmToken(token);
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(
            @CookieValue(name = "refreshToken") String token) {
        System.out.println("refresh-token: " + token);
        RefreshTokenRequest request = new RefreshTokenRequest(token);
        RefreshTokenResponse response = refreshTokenService.refreshToken(request);
        System.out.println("RESPONSE ON REFRESH: " + response);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Integer> logout(@RequestHeader("RefreshToken") String request) {
        return ResponseEntity.ok(refreshTokenService.deleteRefreshToken(new RefreshTokenRequest(request)));
    }
}
