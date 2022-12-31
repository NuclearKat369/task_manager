package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.dto.TaskStatusCountDto;

import java.util.List;

public interface StatusRepositoryCriteria {

    List<TaskStatusCountDto> taskStatusCountDto();

}
