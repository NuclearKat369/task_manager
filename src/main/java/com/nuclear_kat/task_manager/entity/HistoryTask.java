//package com.nuclear_kat.task_manager.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedDate;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Entity
//@Table(name = "tasks_audit")
//public class HistoryTask {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "task_id")
//    private int taskId;
//
//    @Column(name = "task_name")
//    private String taskName;
//
//    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
//    @JoinColumn(name = "task_status", referencedColumnName = "status_id")
//    private Status taskStatus;
//
//    @Column(name = "task_text")
//    private String taskText;
//
//    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
//    @JoinColumn(name = "task_subtype", referencedColumnName = "subtype_id")
//    private Subtype taskSubtype;
//
//    @Column(name = "updated_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
//    private LocalDateTime lastUpdated;
//
//    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH, CascadeType.REMOVE}
//            , mappedBy = "fileTask", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private List<FileData> taskFiles;
//
//}
