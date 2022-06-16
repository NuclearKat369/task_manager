package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.TaskRepository;
import com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDTO;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImplementation implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll(Sort.by(Sort.Direction.DESC, "taskId"));
    }

    @Override
    public void saveTask(Task task) {
        taskRepository.save(task);
    }

    @Override
    public Task getTask(int taskId) {
        Task task = null;
        Optional<Task> optional = taskRepository.findById(taskId);
        if (optional.isPresent()) {
            task = optional.get();
        }
        return task;
    }

    @Override
    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }

    public List<TaskStatusSubtypeDTO> getAllTasksWithStatusAndSubtype() {
        return taskRepository.getAllTasksWithStatusAndSubtype();
    }

    public TaskStatusSubtypeDTO getTaskByTaskIdWithStatusAndSubtype(int taskId) {
        return taskRepository.getTaskByTaskIdWithStatusAndSubtype(taskId);
    }

}

