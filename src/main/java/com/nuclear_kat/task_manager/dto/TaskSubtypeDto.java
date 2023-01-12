package com.nuclear_kat.task_manager.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaskSubtypeDto {

    private String taskName;
    private String taskText;
    private int subtypeId;
    private int taskId;

    public TaskSubtypeDto(String taskName, String taskText, int subtypeId) {
        this.taskName = taskName;
        this.taskText = taskText;
        this.subtypeId = subtypeId;
        this.taskId = -1;
    }

}
