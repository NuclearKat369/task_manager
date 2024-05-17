package com.nuclear_kat.task_manager.dto;

import com.nuclear_kat.task_manager.entity.Status;
import com.nuclear_kat.task_manager.entity.Subtype;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/* Краткая информация о заявке - статус, подтип, ID, заголовок, дата и время создания, EmployeeNoRolesDto
 * с данными ответственного */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatusSubtypeDto {

    private Status status;
    private Subtype subtype;
    private int taskId;
    private String taskName;
    private LocalDateTime taskCreatedAt;
    private EmployeeNoRolesDto employeeInCharge;

    public TaskStatusSubtypeDto(Status status, Subtype subtype,
                                int taskId, String taskName,
                                LocalDateTime taskCreatedAt, UUID employeeInChargeUuid) {
        this.status = status;
        this.subtype = subtype;
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskCreatedAt = taskCreatedAt;
        this.employeeInCharge = new EmployeeNoRolesDto(employeeInChargeUuid);
    }
}
