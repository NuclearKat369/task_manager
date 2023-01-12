package com.nuclear_kat.task_manager.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

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
