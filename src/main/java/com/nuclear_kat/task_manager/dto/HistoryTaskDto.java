package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

/* HistoryTaskDto используется для передачи данных ходе решения заявки:
 * содержит ID заявки, текст, дата данного изменения, ФИО изменившего */
@Data
@AllArgsConstructor
public class HistoryTaskDto {

    private int taskId;
    private String historyTaskText;
    private LocalDateTime historyLastUpdated;
    private String historyModifiedByLastName;
    private String historyModifiedByFirstName;
    private String historyModifiedByPatronymic;
}
