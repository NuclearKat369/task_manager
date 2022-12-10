package com.nuclear_kat.task_manager.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "files")
public class FileData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private int fileId;

    @Column(name = "file_name")
    private String fileName;

    @Lob
    @Column(name = "file_obj")
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] fileData;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "task_id", referencedColumnName = "task_id")
    private Task fileTask;

    public FileData() {
    }

    public FileData(String fileName, byte[] fileData, Task fileTask) {
        this.fileName = fileName;
        this.fileData = fileData;
        this.fileTask = fileTask;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] data) {
        this.fileData = data;
    }

    public Task getFileTask() {
        return fileTask;
    }

    public void setFileTask(Task fileTask) {
        this.fileTask = fileTask;
    }
}
