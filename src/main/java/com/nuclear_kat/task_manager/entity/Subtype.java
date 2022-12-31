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
@Table(name = "subtype")
public class Subtype {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subtype_id")
    private int subtypeId;

    @Column(name = "subtype_name")
    private String subtypeName;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}
            , mappedBy = "taskSubtype", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Task> tasks;

    public Subtype(String subtypeName){
        this.subtypeName = subtypeName;
    }

    public void addTaskSubtype(Task task) {
        if (tasks == null) {
            tasks = new ArrayList<>();
        }
        tasks.add(task);
        task.setTaskSubtype(this);
    }
}
