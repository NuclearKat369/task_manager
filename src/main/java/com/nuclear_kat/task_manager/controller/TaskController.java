package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDTO;
import com.nuclear_kat.task_manager.dto.TaskSubtypeDto;
import com.nuclear_kat.task_manager.entity.Status;
import com.nuclear_kat.task_manager.entity.Subtype;
import com.nuclear_kat.task_manager.entity.Task;
import com.nuclear_kat.task_manager.service.StatusService;
import com.nuclear_kat.task_manager.service.SubtypeService;
import com.nuclear_kat.task_manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/tasks")
    private Task addNewTask(@RequestBody TaskSubtypeDto taskSubtypeDto) {
        Task task = entityFromTaskSubtypeDto(taskSubtypeDto);

        taskService.saveTask(task);
        return task;
    }

    @PutMapping("/tasks/{taskId}")
    public Task updateTask(@PathVariable int taskId, @RequestBody TaskStatusSubtypeDTO taskStatusSubtypeDTOBody) {
        Task task = entityFromTaskStatusSubtypeDto(taskStatusSubtypeDTOBody);
        task.setTaskId(taskId);

        taskService.saveTask(task);
        return task;
    }

    @DeleteMapping("/tasks/{taskId}")
    public String deleteTask(@PathVariable int taskId) {

        taskService.deleteTask(taskId);

        //todo add ExceptionHandling
        return "Task with ID = " + taskId + " was deleted from Database";
    }

    @GetMapping("/tasks/{taskId}")
    public TaskStatusSubtypeDTO getTask(@PathVariable int taskId) {

        //todo add ExceptionHandling

        return taskService.getTaskByTaskIdWithStatusAndSubtype(taskId);
    }

    @GetMapping("/tasks")
    public List<TaskStatusSubtypeDTO> showWithStatusesAndSubtypes(){

        return taskService.getAllTasksWithStatusAndSubtype();
    }

    private Task entityFromTaskStatusSubtypeDto(TaskStatusSubtypeDTO taskStatusSubtypeDTO){
        Task task = new Task();
        Status status = statusService.getStatus(taskStatusSubtypeDTO.getStatusId());
        Subtype subtype = subtypeService.getSubtype(taskStatusSubtypeDTO.getSubtypeId());
        task.setTaskName(taskStatusSubtypeDTO.getTaskName());
        task.setTaskText(taskStatusSubtypeDTO.getTaskText());
        status.addTaskStatus(task);
        subtype.addTaskSubtype(task);

        return task;
    }

    private Task entityFromTaskSubtypeDto(TaskSubtypeDto taskSubtypeDto){
        Task task = new Task();
        Subtype subtype = subtypeService.getSubtype(taskSubtypeDto.getSubtypeId());
        task.setTaskName(taskSubtypeDto.getTaskName());
        task.setTaskText(taskSubtypeDto.getTaskText());
        subtype.addTaskSubtype(task);

        return task;
    }
}
