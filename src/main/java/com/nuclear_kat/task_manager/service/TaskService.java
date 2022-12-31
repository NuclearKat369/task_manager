package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.TaskFullDto;
import com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto;
import com.nuclear_kat.task_manager.entity.Task;

import java.util.List;

public interface TaskService {

    public List<Task> getAllTasks();

    public Task saveTask(Task task);

    public Task getTask(int taskId);

    public void deleteTask(int taskId);

    public List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtype();

//    public TaskStatusSubtypeDto getTaskByTaskIdWithStatusAndSubtype(int taskId);

    public List<TaskStatusSubtypeDto> getAllWithStatus(int statusId);

    public TaskFullDto getTaskFullInfo(int taskId);

    public long countTasksAll();

}
