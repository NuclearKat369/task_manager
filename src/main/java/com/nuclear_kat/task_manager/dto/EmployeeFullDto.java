package com.nuclear_kat.task_manager.dto;

import com.nuclear_kat.task_manager.entity.Department;
import com.nuclear_kat.task_manager.entity.Position;
import com.nuclear_kat.task_manager.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.UUID;

/* EmployeeFullDto - полная информация о сотруднике, содержит UUID, ФИО, email, роли, должность, отдел;
 * для краткой информации использовать EmployeeDto; не содержит пароля */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeFullDto {

    private UUID uuid;
    private String lastName;
    private String firstName;
    private String patronymic;
    private String email;
    private Collection<Role> roles;
    private Position position;
    private Department department;
}
