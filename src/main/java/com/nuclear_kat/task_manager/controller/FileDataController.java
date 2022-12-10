package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.TaskFileDto;
import com.nuclear_kat.task_manager.dto.TaskFullDto;
import com.nuclear_kat.task_manager.dto.TaskSubtypeDto;
import com.nuclear_kat.task_manager.entity.FileData;
import com.nuclear_kat.task_manager.entity.Status;
import com.nuclear_kat.task_manager.entity.Subtype;
import com.nuclear_kat.task_manager.entity.Task;
import com.nuclear_kat.task_manager.service.FileDataService;
import com.nuclear_kat.task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/files")
public class FileDataController {

    @Autowired
    private FileDataService fileDataService;

    @Autowired
    private TaskService taskService;

    @PostMapping("/uploadFile/{taskId}")
    private MultipartFile uploadFileData(@PathVariable int taskId, @RequestParam("file") MultipartFile multipartFile) throws IOException {
        Task task = taskService.getTask(taskId);
        fileDataService.saveFileData(multipartFile, task);
        System.out.println(task);
        return(multipartFile);
    }

    @GetMapping("/{fileId}")
    public FileData getFile(@PathVariable int fileId) {
        return fileDataService.getFileData(fileId);
    }

    @GetMapping("/all")
    public List<FileData> getAllFiles(){
        return fileDataService.getAllFileData();
    }

}
