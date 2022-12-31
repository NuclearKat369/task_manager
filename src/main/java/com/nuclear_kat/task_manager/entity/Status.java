package com.nuclear_kat.task_manager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "status")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "status_id")
    private int statusId;

    @Column(name = "status_name")
    private String statusName;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}
            , mappedBy = "taskStatus", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Task> tasks;

    public Status(String statusName) {
        this.statusName = statusName;
    }

    public void addTaskStatus(Task task) {
        if (tasks == null) {
            tasks = new ArrayList<>();
        }
        tasks.add(task);
        task.setTaskStatus(this);
    }
}
