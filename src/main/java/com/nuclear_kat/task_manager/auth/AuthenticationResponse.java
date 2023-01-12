package com.nuclear_kat.task_manager.auth;

import com.nuclear_kat.task_manager.entity.Role;
import lombok.*;

import java.util.Collection;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String accessToken;
    private String refreshToken;
    private UUID employeeId;
    private String email;
    private String firstName;
    private String lastName;
    private String patronymic;
    private Collection<Role> roles;

}
