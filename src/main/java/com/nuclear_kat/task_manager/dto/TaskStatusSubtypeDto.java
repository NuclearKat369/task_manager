package com.nuclear_kat.task_manager.dto;

public class TaskStatusSubtypeDto {

    private int statusId;
    private String statusName;
    private int subtypeId;
    private String subtypeName;
    private int taskId;
    private String taskName;

    public TaskStatusSubtypeDto() {
    }

    public TaskStatusSubtypeDto(int statusId, String statusName
            , int subtypeId, String subtypeName
            , int taskId, String taskName) {
        this.statusId = statusId;
        this.statusName = statusName;
        this.subtypeId = subtypeId;
        this.subtypeName = subtypeName;
        this.taskId = taskId;
        this.taskName = taskName;
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

    @Override
    public String toString() {
        return "TaskStatusSubtypeDTO{" +
                "statusId=" + statusId +
                ", statusName='" + statusName + '\'' +
                ", subtypeId=" + subtypeId +
                ", subtypeName='" + subtypeName + '\'' +
                ", taskId=" + taskId +
                ", taskName='" + taskName + '\'' +
                '}';
    }
}
