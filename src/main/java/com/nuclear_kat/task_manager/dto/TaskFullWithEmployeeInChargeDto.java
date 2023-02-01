package com.nuclear_kat.task_manager.dto;

import com.nuclear_kat.task_manager.entity.Status;
import com.nuclear_kat.task_manager.entity.Subtype;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/* В отличие от TaskFullNoEmployeeInChargeDto TaskFullWithEmployeeInChargeDto содержит дополнительные данные о заявке:
 * статус, подтип, ID, заголовок, текст, когда создана, UUID и ФИО создавшего, UUID и ФИО ответственного */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskFullWithEmployeeInChargeDto {
    private Status status;
    private Subtype subtype;
    private int taskId;
    private String taskName;
    private String taskText;
    private LocalDateTime createdAt;
    private UUID taskCreatorId;
    private String taskCreatorLastName;
    private String taskCreatorFirstName;
    private String taskCreatorPatronymic;
    private UUID taskEmployeeInChargeId;
    private String taskEmployeeInChargeLastName;
    private String taskEmployeeInChargeFirstName;
    private String taskEmployeeInChargePatronymic;
}
