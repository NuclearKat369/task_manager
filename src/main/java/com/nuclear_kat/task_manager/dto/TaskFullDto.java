package com.nuclear_kat.task_manager.dto;

import com.nuclear_kat.task_manager.entity.FileData;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

public class TaskFullDto {

    private int statusId;
    private String statusName;
    private int subtypeId;
    private String subtypeName;
    private int taskId;
    private String taskName;
    private String taskText;
    private LocalDateTime created;

    public TaskFullDto() {
    }

    public TaskFullDto(int statusId, String statusName, int subtypeId, String subtypeName,
                       int taskId, String taskName, String taskText, LocalDateTime created) {
        this.statusId = statusId;
        this.statusName = statusName;
        this.subtypeId = subtypeId;
        this.subtypeName = subtypeName;
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskText = taskText;
        this.created = created;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public int getSubtypeId() {
        return subtypeId;
    }

    public void setSubtypeId(int subtypeId) {
        this.subtypeId = subtypeId;
    }

    public String getSubtypeName() {
        return subtypeName;
    }

    public void setSubtypeName(String subtypeName) {
        this.subtypeName = subtypeName;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskText() {
        return taskText;
    }

    public void setTaskText(String taskText) {
        this.taskText = taskText;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    @Override
    public String toString() {
        return "TaskFullDto{" +
                "statusId=" + statusId +
                ", statusName='" + statusName + '\'' +
                ", subtypeId=" + subtypeId +
                ", subtypeName='" + subtypeName + '\'' +
                ", taskId=" + taskId +
                ", taskName='" + taskName + '\'' +
                ", taskText='" + taskText + '\'' +
                ", created=" + created +
                '}';
    }
}
