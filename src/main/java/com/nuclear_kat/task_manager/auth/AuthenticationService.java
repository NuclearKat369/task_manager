package com.nuclear_kat.task_manager.auth;

public interface AuthenticationService {

    String register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
    String confirmToken(String token);

}
