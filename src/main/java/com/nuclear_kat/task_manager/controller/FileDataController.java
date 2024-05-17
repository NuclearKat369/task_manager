package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.TaskFileDto;
import com.nuclear_kat.task_manager.entity.FileData;
import com.nuclear_kat.task_manager.entity.Task;
import com.nuclear_kat.task_manager.service.FileDataService;
import com.nuclear_kat.task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/files")
public class FileDataController {

    @Autowired
    private FileDataService fileDataService;
    @Autowired
    private TaskService taskService;

    // Загрузка нового файла
    @PostMapping("/uploadFile")
    public String uploadFileData(
            @RequestParam("taskId") int taskId,
            @RequestParam("files") MultipartFile[] multipartFiles) throws IOException {
        Task task = taskService.getTask(taskId);
        Arrays.stream(multipartFiles).forEach(multipartFile -> {
            try {
                fileDataService.saveFileData(multipartFile, task);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        return ("files uploaded: " + multipartFiles.length);
    }

    // Поиск файла по ID
    @GetMapping("/{fileId}")
    public FileData getFile(@PathVariable int fileId) {
        return fileDataService.getFileData(fileId);
    }

    // Получение байтов файла по ID без его названия и ID
    @GetMapping("/data/{fileId}")
    public byte[] getFileData(@PathVariable int fileId) {
        return fileDataService.getFileBytes(fileId);
    }

    // Получение списка всех файлов заявки, только их ID и названия
    @GetMapping("/task/{taskId}")
    public List<TaskFileDto> getFiles(@PathVariable int taskId) {
        return fileDataService.getAllFileDataByTaskId(taskId);
    }

//    // Получение всех файлов
//    @GetMapping("/all")
//    public List<FileData> getAllFiles() {
//        return fileDataService.getAllFileData();
//    }

    // Удаление файла по ID
    @DeleteMapping("/{fileId}")
    public String deleteFileData(@PathVariable int fileId) {
        fileDataService.deleteFileData(fileId);
        return "File with ID = " + fileId + " was deleted from Database";
    }
}
