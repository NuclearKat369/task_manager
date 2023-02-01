package com.nuclear_kat.task_manager.dto;

import com.nuclear_kat.task_manager.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.UUID;

/*EmployeeDto - краткая информация о сотруднике, содержит UUID, ФИО, email, роли;
* для более полной информации использовать EmployeeFullDto; не содержит пароля */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    private UUID uuid;
    private String lastName;
    private String firstName;
    private String patronymic;
    private String email;
    private Collection<Role> roles;
}
