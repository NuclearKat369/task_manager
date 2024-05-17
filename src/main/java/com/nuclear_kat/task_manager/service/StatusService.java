package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.TaskStatusCountDto;
import com.nuclear_kat.task_manager.entity.Status;

import java.util.List;

public interface StatusService {

    List<Status> getAllStatuses();

    Status getStatus(int statusId);

    List<TaskStatusCountDto> countTasksByTaskStatus();
}
//
//    void deleteStatus(int statusId);
//
//    void saveStatus(Status status);