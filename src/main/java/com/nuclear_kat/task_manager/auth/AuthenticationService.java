package com.nuclear_kat.task_manager.auth;

import com.nuclear_kat.task_manager.dto.ChangePasswordDto;

public interface AuthenticationService {

    int register(RegisterRequestDto request);

    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);

    String confirmToken(String token);

    int changeEmployeePassword(String employeeId, ChangePasswordDto changePasswordDto);

}
