package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EmployeeRegistrationDto {

    private String firstName;
    private String lastName;
    private String patronymic;
    private String email;
    private String password;
}
