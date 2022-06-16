package com.nuclear_kat.task_manager.entity;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private int taskId;

    @Column(name = "task_name")
    private String taskName;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "task_status", referencedColumnName = "status_id")
    private Status taskStatus;

    @Column(name = "task_text")
    private String taskText;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "task_subtype", referencedColumnName = "subtype_id")
    private Subtype taskSubtype;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private OffsetDateTime lastUpdated;

    public Task() {
    }

    public Task(String taskName, String taskText) {
        this.taskName = taskName;
        this.taskText = taskText;
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

    public Status getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(Status taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getTaskText() {
        return taskText;
    }

    public void setTaskText(String taskText) {
        this.taskText = taskText;
    }

    public OffsetDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(OffsetDateTime last_updated) {
        this.lastUpdated = last_updated;
    }

    public Subtype getTaskSubtype() {
        return taskSubtype;
    }

    public void setTaskSubtype(Subtype taskSubtype) {
        this.taskSubtype = taskSubtype;
    }
}
