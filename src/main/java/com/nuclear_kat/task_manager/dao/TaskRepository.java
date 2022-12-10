package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.dto.TaskFullDto;
import com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    // Выборка из БД всех строк "tasks" с присоединением имён "subtype" и "status"
    // с использованием соответствующего DTO
    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto(" +
            "s.statusId, s.statusName, sub.subtypeId, sub.subtypeName, t.taskId, t.taskName) " +
            "FROM Task t JOIN t.taskStatus s JOIN t.taskSubtype sub ORDER BY t.taskId DESC")
    List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtype();

    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto(" +
            "s.statusId, s.statusName, sub.subtypeId, sub.subtypeName, t.taskId, t.taskName) " +
            "FROM Task t JOIN t.taskStatus s JOIN t.taskSubtype sub WHERE s.statusId=:statusId ORDER BY t.taskId DESC")
    List<TaskStatusSubtypeDto> getAllWithStatusId(int statusId);

    // Выборка из БД одной строки "tasks" с присоединением имён "subtype" и "status"
    // с использованием соответствующего DTO по указаннуму ID
    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskFullDto(" +
            "s.statusId, s.statusName, sub.subtypeId, sub.subtypeName, t.taskId, t.taskName, t.taskText) " +
            "FROM Task t JOIN t.taskStatus s JOIN t.taskSubtype sub WHERE t.taskId=:taskId")
    TaskFullDto getTaskFullInfo(int taskId);

    @Query("SELECT COUNT(t.taskId) FROM Task t")
    long countAllTasks();

}
