package com.nuclear_kat.task_manager.dto;

import com.nuclear_kat.task_manager.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/* EmployeeStatusCountDto используется для подсчёта задач с определённым статусом,
 * назначенных на сотрудника */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeStatusCountDto {
    private long taskCount;
    private Status taskStatus;
}
