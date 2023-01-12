package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskFullDto {

    private int statusId;
    private String statusName;
    private int subtypeId;
    private String subtypeName;
    private int taskId;
    private String taskName;
    private String taskText;
    private LocalDateTime created;
    }
