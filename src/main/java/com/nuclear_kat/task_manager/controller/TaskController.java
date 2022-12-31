package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.TaskFullDto;
import com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto;
import com.nuclear_kat.task_manager.dto.TaskSubtypeDto;
import com.nuclear_kat.task_manager.entity.Status;
import com.nuclear_kat.task_manager.entity.Subtype;
import com.nuclear_kat.task_manager.entity.Task;
import com.nuclear_kat.task_manager.service.FileDataService;
import com.nuclear_kat.task_manager.service.StatusService;
import com.nuclear_kat.task_manager.service.SubtypeService;
import com.nuclear_kat.task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private StatusService statusService;

    @Autowired
    private SubtypeService subtypeService;

    @Autowired
    private FileDataService fileDataService;

    @PostMapping("/tasks")
    private Task addTask(@RequestBody TaskSubtypeDto taskSubtypeDto) {
        Task task = entityFromTaskSubtypeDto(taskSubtypeDto);
        Task savedTask = taskService.saveTask(task);

        System.out.println("taskID in addTask: " + savedTask.getTaskId());
        System.out.println("taskID in addTask: " + savedTask.getCreated());

        return savedTask;
    }

    @PutMapping("/tasks/{taskId}")
    public Task updateTask(@PathVariable int taskId
            , @RequestBody TaskFullDto taskFullDtoBody) {
        Task task = entityFromTaskFullDto(taskFullDtoBody);
        task.setTaskId(taskId);
        Task savedTask = taskService.saveTask(task);
        return savedTask;
    }

    @DeleteMapping("/tasks/{taskId}")
    public String deleteTask(@PathVariable int taskId) {

        taskService.deleteTask(taskId);

        return "Task with ID = " + taskId + " was deleted from Database";
    }

//    @GetMapping("/tasks/{taskId}")
//    public TaskStatusSubtypeDto getTask(@PathVariable int taskId) {
//
//        return taskService.getTaskByTaskIdWithStatusAndSubtype(taskId);
//    }

    @GetMapping("/tasks/{taskId}")
    public TaskFullDto getTask(@PathVariable int taskId) {
        return taskService.getTaskFullInfo(taskId);
    }

    @GetMapping("/tasks/getStatus/{statusId}")
    public List<TaskStatusSubtypeDto> getTaskWithStatus(@PathVariable int statusId) {

        return taskService.getAllWithStatus(statusId);
    }

    @GetMapping("/tasks")
    public List<TaskStatusSubtypeDto> showWithStatusesAndSubtypes() {

        return taskService.getAllTasksWithStatusAndSubtype();
    }


    @GetMapping("tasks/getNumberOfAllTasks")
    public long countTasksAll() {
        System.out.println("countTasksAll = " + taskService.countTasksAll());
        return taskService.countTasksAll();
    }

    //    Конвертация из DTO в объект класса Task
    private Task entityFromTaskFullDto(TaskFullDto taskFullDto) {
        Task task = new Task();
        Status status = statusService.getStatus(taskFullDto.getStatusId());
        Subtype subtype = subtypeService.getSubtype(taskFullDto.getSubtypeId());
        task.setTaskName(taskFullDto.getTaskName());
        task.setTaskText(taskFullDto.getTaskText());
        status.addTaskStatus(task);
        subtype.addTaskSubtype(task);

        return task;
    }

    //    Конвертация из DTO в объект класса Task
    private Task entityFromTaskSubtypeDto(TaskSubtypeDto taskSubtypeDto) {
        Task task = new Task();
        Subtype subtype = subtypeService.getSubtype(taskSubtypeDto.getSubtypeId());
        task.setTaskName(taskSubtypeDto.getTaskName());
        task.setTaskText(taskSubtypeDto.getTaskText());
        subtype.addTaskSubtype(task);

        return task;
    }
}
