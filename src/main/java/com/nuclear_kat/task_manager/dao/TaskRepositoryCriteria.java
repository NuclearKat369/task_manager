package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.dto.EmployeeTasksDto;

import java.util.List;

public interface TaskRepositoryCriteria {

    List<EmployeeTasksDto> employeeTaskCountDto();
}
