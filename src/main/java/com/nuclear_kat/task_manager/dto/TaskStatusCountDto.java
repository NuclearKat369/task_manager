package com.nuclear_kat.task_manager.dto;

public class TaskStatusCountDto {

    private int statusId;
    private String statusName;
    private Long statusCount;

    TaskStatusCountDto() {
    }

    public TaskStatusCountDto(int statusId, String statusName, Long statusCount) {
        this.statusId = statusId;
        this.statusName = statusName;
        if (statusCount == null) {
            this.statusCount = (long) 0;
        } else {
            this.statusCount = statusCount;
        }
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

    public Long getStatusCount() {
        return statusCount;
    }

    public void setStatusCount(Long statusCount) {
        this.statusCount = statusCount;
    }

    @Override
    public String toString() {
        return "TaskCountDto{" +
                "statusId=" + statusId +
                ", statusName='" + statusName + '\'' +
                ", statusCount=" + statusCount +
                '}';
    }
}
