package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.*;
import com.nuclear_kat.task_manager.entity.Task;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface TaskService {

    Task saveTask(TaskSubtypeDto taskSubtypeDto, HttpServletRequest request);
    TaskFullWithEmployeeInChargeDto saveTask(int taskId, UpdateTaskDto updateTaskDto, HttpServletRequest request);

    Task getTask(int taskId);

    void deleteTask(int taskId);

    List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtype();

    List<TaskStatusSubtypeDto> getAllWithStatus(int statusId);

    TaskFullNoEmployeeInChargeDto getTaskFullInfo(int taskId);

    long countTasksAll();

    List<EmployeeTasksDto> getEmployeeTaskList();

    EmployeeNoRolesDto getEmployeeInCharge(int taskId);

    List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtypeCreatedByEmployee(HttpServletRequest request);

    long countAllTasksCreated(HttpServletRequest request);

    List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtypeInCharge(HttpServletRequest request);

    long countAllTasksInCharge(HttpServletRequest request);
}
