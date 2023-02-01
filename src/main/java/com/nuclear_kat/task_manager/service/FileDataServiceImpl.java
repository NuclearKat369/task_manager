package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.FileDataRepository;
import com.nuclear_kat.task_manager.dto.TaskFileDto;
import com.nuclear_kat.task_manager.entity.FileData;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FileDataServiceImpl implements FileDataService {

    @Autowired
    private FileDataRepository fileDataRepository;

    // Получить все файлы
    @Override
    public List<FileData> getAllFileData() {
        return fileDataRepository.findAll();
    }

    // Сохранение файлов (поддерживается сохраниение списка файлов)
    @Override
    public void saveFileData(MultipartFile multipartFile, Task fileTask) throws IOException {
        String fileName = multipartFile.getOriginalFilename();
        System.out.println("FILENAME: " + fileName);
        FileData fileData = new FileData(fileName, multipartFile.getBytes(), fileTask);
        fileDataRepository.save(fileData);
    }

    // Получение файла по ID
    @Override
    public FileData getFileData(int fileDataId) {
        FileData fileData = null;
        Optional<FileData> optional = fileDataRepository.findById(fileDataId);
        if (optional.isPresent()) {
            fileData = optional.get();
        }
        return fileData;
    }

    // Получение данных файла (для скачивания)
    @Override
    public byte[] getFileBytes(int fileDataId) {
        FileData fileData = null;
        Optional<FileData> optional = fileDataRepository.findById(fileDataId);
        if (optional.isPresent()) {
            fileData = optional.get();
        }
        return fileData.getFileData();
    }

    // Удаление файла
    @Override
    public void deleteFileData(int fileDataId) {
        fileDataRepository.deleteById(fileDataId);
    }

    // Получение только названия и ID файла
    @Override
    public List<TaskFileDto> getAllFileDataByTaskId(int taskId) {
        return fileDataRepository.getFileDataByTaskId(taskId);
    }
}
