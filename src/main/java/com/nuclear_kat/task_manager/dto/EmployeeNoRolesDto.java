package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/*EmployeeNoRolesDto - базовая информация о сотруднике: UUID, ФИО, email;
* для более полной информации использовать EmployeeDto или EmployeeFullDto */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeNoRolesDto {

    private UUID uuid;
    private String lastName;
    private String firstName;
    private String patronymic;
    private String email;

    public EmployeeNoRolesDto(UUID uuid) {
        this.uuid = uuid;
    }
}
