package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.TaskRepository;
import com.nuclear_kat.task_manager.dto.TaskFullDto;
import com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll(Sort.by(Sort.Direction.DESC, "taskId"));
    }

    @Override
    public Task saveTask(Task task) {
        Task savedTask = taskRepository.save(task);
        System.out.println(savedTask.toString());
        return savedTask;
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

    public List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtype() {
        return taskRepository.getAllTasksWithStatusAndSubtype();
    }

    public TaskFullDto getTaskFullInfo(int taskId) {
        return taskRepository.getTaskFullInfo(taskId);
    }

    public List<TaskStatusSubtypeDto> getAllWithStatus(int statusId) {

        return taskRepository.getAllWithStatusId(statusId);
    }

    public long countTasksAll(){
     return taskRepository.countAllTasks();
    }

}

