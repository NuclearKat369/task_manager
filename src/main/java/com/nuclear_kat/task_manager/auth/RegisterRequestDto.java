package com.nuclear_kat.task_manager.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDto {

    private String firstName;
    private String lastName;
    private String patronymic;
    private String email;
    private String password;
}
