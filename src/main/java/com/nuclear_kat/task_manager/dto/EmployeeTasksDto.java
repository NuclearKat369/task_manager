package com.nuclear_kat.task_manager.dto;

import com.nuclear_kat.task_manager.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/* EmployeeTasksDto используется в TaskRepositoryCriteriaImpl при составлении результатов
 * запроса данных из БД о сотруднике и назначенных на него задачах */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeTasksDto {
    private UUID employeeId;
    private String lastName;
    private String firstName;
    private String patronymic;
    private List<EmployeeStatusCountDto> employeeStatusCount = new ArrayList<>();

    public EmployeeTasksDto(UUID employeeId, String lastName,
                            String firstName, String patronymic,
                            long taskCount, Status taskStatus) {
        this.employeeId = employeeId;
        this.lastName = lastName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        EmployeeStatusCountDto employeeStatusCountDto = new EmployeeStatusCountDto();
        employeeStatusCountDto.setTaskCount(taskCount);
        employeeStatusCountDto.setTaskStatus(taskStatus);
        employeeStatusCount.add(employeeStatusCountDto);
    }
}
