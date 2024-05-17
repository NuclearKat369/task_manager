package com.nuclear_kat.task_manager.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

/* TaskStatusCountDto используется в StatusRepositoryCriteriaImpl при составлении результатов
 * запроса данных из БД о количестве заявок с определённым статусом */
@Data
@NoArgsConstructor
public class TaskStatusCountDto {

    private int statusId;
    private String statusName;
    private Long statusCount;

    public TaskStatusCountDto(int statusId, String statusName, Long statusCount) {
        this.statusId = statusId;
        this.statusName = statusName;
        if (statusCount == null) {
            this.statusCount = (long) 0;
        } else {
            this.statusCount = statusCount;
        }
    }
}
