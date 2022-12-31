package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.EmployeeRegistrationDto;
import com.nuclear_kat.task_manager.entity.Employee;

public interface EmployeeService {

    Employee save(EmployeeRegistrationDto registrationDto);

}
