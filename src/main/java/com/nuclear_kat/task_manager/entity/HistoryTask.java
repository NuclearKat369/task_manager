package com.nuclear_kat.task_manager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "tasks_audit")
public class HistoryTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "action_id")
    private long action_id;

    @JoinColumn(name = "task_id", referencedColumnName = "task_id")
    private long taskId;

    @Column(name = "task_name")
    private String historyTaskName;

    @Column(name = "task_text")
    private String historyTaskText;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "task_status", referencedColumnName = "status_id")
    private Status historyTaskStatus;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "task_subtype", referencedColumnName = "subtype_id")
    private Subtype historyTaskSubtype;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime historyLastUpdated;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "modifiedBy", referencedColumnName = "employee_id")
    @JsonIgnore
    private Employee historyModifiedBy;
}
