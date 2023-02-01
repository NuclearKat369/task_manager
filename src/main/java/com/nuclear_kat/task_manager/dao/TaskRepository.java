package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.dto.EmployeeNoRolesDto;
import com.nuclear_kat.task_manager.dto.TaskFullNoEmployeeInChargeDto;
import com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer>, TaskRepositoryCriteria {

    // Выборка из БД всех строк "tasks" с присоединением имён "subtype" и "status"
    // с использованием соответствующего DTO
    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto(" +
            "t.taskStatus, t.taskSubtype, t.taskId, t.taskName, t.createdAt, t.employeeInCharge.uuid) " +
            "FROM Task t ORDER BY t.taskId DESC")
    List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtype();

    // Выборка их БД всех строк с "tasks" с определённым статусом
    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto(" +
            "t.taskStatus, t.taskSubtype, t.taskId, t.taskName, t.createdAt, t.employeeInCharge.uuid) " +
            "FROM Task t WHERE t.taskStatus.statusId=:statusId ORDER BY t.taskId DESC")
    List<TaskStatusSubtypeDto> getAllWithStatusId(int statusId);

    // Выборка из БД одной строки "tasks" с присоединением имён "subtype" и "status"
    // с использованием соответствующего DTO по указаннуму ID
    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskFullNoEmployeeInChargeDto(" +
            "t.taskStatus, t.taskSubtype, t.taskId, " +
            "t.taskName, t.taskText, t.createdAt, c.uuid, c.lastName, c.firstName, c.patronymic) " +
            "FROM Task t JOIN t.createdBy c WHERE t.taskId=:taskId")
    TaskFullNoEmployeeInChargeDto getTaskFullInfo(int taskId);

    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto(" +
            "t.taskStatus, t.taskSubtype, t.taskId, t.taskName, t.createdAt, t.employeeInCharge.uuid) " +
            "FROM Task t WHERE t.createdBy.uuid=:employeeId " +
            "AND t.taskStatus.statusId BETWEEN 1 and 3 ORDER BY t.taskId DESC")
    List<TaskStatusSubtypeDto> getAllByCreatedBy(UUID employeeId);

    @Query("SELECT COUNT(t.taskId) FROM Task t WHERE t.createdBy.uuid=:employeeId")
    long countAllTasksByCreatedBy(UUID employeeId);

    @Query("SELECT COUNT(t.taskId) FROM Task t")
    long countAllTasks();

    @Query("SELECT new com.nuclear_kat.task_manager.dto.EmployeeNoRolesDto(" +
            "e.uuid, e.lastName, e.firstName, e.patronymic, e.email) " +
            "FROM Task t JOIN t.employeeInCharge e WHERE t.taskId=:taskId")
    EmployeeNoRolesDto findEmployeeInCharge(int taskId);

    @Transactional
    @Modifying
    @Query("UPDATE Task t SET t.employeeInCharge=:uuid WHERE t.taskId=:taskId")
    Task changeEmployeeInCharge(int taskId, UUID uuid);

    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskStatusSubtypeDto(" +
            "t.taskStatus, t.taskSubtype, t.taskId, t.taskName, t.createdAt, t.employeeInCharge.uuid) " +
            "FROM Task t WHERE t.employeeInCharge.uuid=:employeeId " +
            "AND t.taskStatus.statusId BETWEEN 1 and 3 ORDER BY t.taskId DESC")
    List<TaskStatusSubtypeDto> getAllInCharge(UUID employeeId);

    @Query("SELECT COUNT(t.taskId) FROM Task t WHERE t.employeeInCharge.uuid=:employeeId")
    long countAllTasksInCharge(UUID employeeId);
}