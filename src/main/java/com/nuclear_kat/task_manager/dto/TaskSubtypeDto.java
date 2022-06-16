package com.nuclear_kat.task_manager.dto;

public class TaskSubtypeDto {

    private String taskName;
    private String taskText;
    private int subtypeId;

    public TaskSubtypeDto() {
    }

    public TaskSubtypeDto(String taskName, String taskText, int subtypeId) {
        this.taskName = taskName;
        this.taskText = taskText;
        this.subtypeId = subtypeId;
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

    public int getSubtypeId() {
        return subtypeId;
    }

    public void setSubtypeId(int subtypeId) {
        this.subtypeId = subtypeId;
    }

    @Override
    public String toString() {
        return "TaskSubtypeDto{" +
                "taskName=" + taskName +
                ", taskText='" + taskText + '\'' +
                ", subtypeId=" + subtypeId +
                '}';
    }
}
