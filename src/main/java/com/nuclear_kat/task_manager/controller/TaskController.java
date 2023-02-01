package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.*;
import com.nuclear_kat.task_manager.entity.Task;
import com.nuclear_kat.task_manager.service.TaskService;
import com.nuclear_kat.task_manager.to_file.ExcelExporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Добавление заявки
    @PostMapping
    private Task addTask(@RequestBody TaskSubtypeDto taskSubtypeDto, HttpServletRequest request) {

        Task savedTask = taskService.saveTask(taskSubtypeDto, request);

        System.out.println("taskID in addTask: " + savedTask.getTaskId());
        System.out.println("CreatedAt in addTask: " + savedTask.getCreatedAt());

        return savedTask;
    }

    // Редактирование заявки
    @PutMapping("/{taskId}")
    public TaskFullWithEmployeeInChargeDto updateTask(@PathVariable int taskId,
                                                      @RequestBody UpdateTaskDto updateTaskDto,
                                                      HttpServletRequest request) {
        TaskFullWithEmployeeInChargeDto savedTask = taskService.saveTask(taskId, updateTaskDto, request);
        return savedTask;
    }

    // Удаление заявки
    @DeleteMapping("/{taskId}")
    public String deleteTask(@PathVariable int taskId) {
        taskService.deleteTask(taskId);
        return "Task with ID = " + taskId + " was deleted from Database";
    }

    // Получение заявки по статусу
    @GetMapping("/{taskId}")
    public TaskFullNoEmployeeInChargeDto getTask(@PathVariable int taskId) {
        if (taskId != -1) {
            TaskFullNoEmployeeInChargeDto tfd = taskService.getTaskFullInfo(taskId);
            System.out.println(tfd);
            return tfd;
        } else {
            return new TaskFullNoEmployeeInChargeDto();
        }
    }

    // Получение заявок с определённым статусом
    @GetMapping("/getStatus/{statusId}")
    public List<TaskStatusSubtypeDto> getTaskWithStatus(@PathVariable String statusId, HttpServletRequest request) {
        if (statusId.equals("creator")) {
            return taskService.getAllTasksWithStatusAndSubtypeCreatedByEmployee(request);
        } else if (statusId.equals("in-charge")) {
            return taskService.getAllTasksWithStatusAndSubtypeInCharge(request);
        } else if (Integer.parseInt(statusId) == 0) {
            return taskService.getAllTasksWithStatusAndSubtype();
        } else {
            return taskService.getAllWithStatus(Integer.parseInt(statusId));
        }
    }

    // Получение заявок с их статусом и подтипом
    @GetMapping
    public List<TaskStatusSubtypeDto> showWithStatusesAndSubtypes() {
        return taskService.getAllTasksWithStatusAndSubtype();
    }

    // Подсчёт всех заявок
    @GetMapping("/getNumberOfAllTasks")
    public long countTasksAll() {
        System.out.println("countTasksAll = " + taskService.countTasksAll());
        return taskService.countTasksAll();
    }

    // Список сотрудник - количество заявок с определённым статусом
    @GetMapping("/workload")
    public List<EmployeeTasksDto> showEmployeeTaskCountDto() {
        return taskService.getEmployeeTaskList();
    }

    // Получить ответственного по заявке
    @GetMapping("/{taskId}/employee-in-charge")
    public EmployeeNoRolesDto getTaskEmployeeInCharge(@PathVariable int taskId) {
        return taskService.getEmployeeInCharge(taskId);
    }

    // Количество созданных заявок
    @GetMapping("/creator-count/{employeeId}")
    public long countAllTasksCreated(HttpServletRequest request) {
        return taskService.countAllTasksCreated(request);
    }

    // Количество назначенных заявок
    @GetMapping("/in-charge-count/{employeeId}")
    public long countAllTasksInCharge(HttpServletRequest request) {
        return taskService.countAllTasksInCharge(request);
    }

    // Файл Excel с загруженностью работников, те же данные, что и в showEmployeeTaskCountDto()
    @GetMapping("/get-excel-file")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);
        List<EmployeeTasksDto> listUsers = taskService.getEmployeeTaskList();

        ExcelExporter excelExporter = new ExcelExporter(listUsers);
        excelExporter.export(response);
    }
}
