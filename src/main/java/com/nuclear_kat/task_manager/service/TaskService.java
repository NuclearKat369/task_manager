package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDTO;
import com.nuclear_kat.task_manager.entity.Task;

import java.util.List;

public interface TaskService {

    public List<Task> getAllTasks();

    public void saveTask(Task task);

    public Task getTask(int taskId);

    public void deleteTask(int taskId);

    public List<TaskStatusSubtypeDTO> getAllTasksWithStatusAndSubtype();

    public TaskStatusSubtypeDTO getTaskByTaskIdWithStatusAndSubtype(int taskId);

}
