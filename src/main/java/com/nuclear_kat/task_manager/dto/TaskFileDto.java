package com.nuclear_kat.task_manager.dto;

import org.springframework.web.multipart.MultipartFile;

public class TaskFileDto {

    private MultipartFile multipartFile;
    private int taskId;

    public TaskFileDto() {
    }

    public TaskFileDto(MultipartFile multipartFile, int taskId) {
        this.multipartFile = multipartFile;
        this.taskId = taskId;
    }

    public MultipartFile getMultipartFile() {
        return multipartFile;
    }

    public void setMultipartFile(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    @Override
    public String toString() {
        return "TaskFileDto{" +
                "multipartFile=" + multipartFile +
                ", taskId=" + taskId +
                '}';
    }
}
