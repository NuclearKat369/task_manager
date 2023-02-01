package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/* Используется для запроса обновления заявки, содержит изменяемые поля: статус, подтип, заголовок, текст
 * ответственного за выполнение */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTaskDto {
    private int statusId;
    private int subtypeId;
    private String taskName;
    private String taskText;
    private String employeeInCharge;
}
