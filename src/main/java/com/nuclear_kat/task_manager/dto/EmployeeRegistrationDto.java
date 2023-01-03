package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRegistrationDto {

    private String firstName;
    private String lastName;
    private String patronymic;
    private String email;
    private String password;
}
