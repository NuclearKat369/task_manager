package com.nuclear_kat.task_manager.dto;

import java.util.Arrays;

public class TaskFileDto {

    private byte[] fileData;
    private String fileName;
    private int fileId;

    public TaskFileDto() {
    }

    public TaskFileDto(byte[] fileData, String fileName, int fileId) {
        this.fileData = fileData;
        this.fileName = fileName;
        this.fileId = fileId;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    @Override
    public String toString() {
        return "TaskFileDto{" +
                "fileData=" + Arrays.toString(fileData) +
                ", fileName='" + fileName + '\'' +
                ", fileId=" + fileId +
                '}';
    }
}
