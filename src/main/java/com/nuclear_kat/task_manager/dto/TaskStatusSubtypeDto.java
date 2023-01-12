package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskStatusSubtypeDto {

    private int statusId;
    private String statusName;
    private int subtypeId;
    private String subtypeName;
    private int taskId;
    private String taskName;

}
