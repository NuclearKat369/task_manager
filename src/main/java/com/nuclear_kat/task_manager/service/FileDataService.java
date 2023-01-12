package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.TaskFileDto;
import com.nuclear_kat.task_manager.entity.FileData;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileDataService {

    List<FileData> getAllFileData();

    void saveFileData(MultipartFile multipartFile, Task fileTask) throws IOException;

    FileData getFileData(int fileDataId);

    void deleteFileData(int fileDataId);

    List<TaskFileDto> getAllFileDataByTaskId(int taskId);

    byte[] getFileBytes(int fileDataId);
}
