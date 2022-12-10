package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.entity.FileData;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileDataService {

    public List<FileData> getAllFileData();

    public void saveFileData(MultipartFile multipartFile, Task fileTask) throws IOException;

    public FileData getFileData(int fileDataId);

    public void deleteFileData(int fileDataId);

}
