package com.nuclear_kat.task_manager.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "files")
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private int fileId;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_obj")
    @Lob
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] fileData;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH
            , CascadeType.DETACH}, fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", referencedColumnName = "task_id")
    private Task fileTask;


    public FileData(String fileName, byte[] fileData, Task fileTask) {
        this.fileName = fileName;
        this.fileData = fileData;
        this.fileTask = fileTask;
    }
}
