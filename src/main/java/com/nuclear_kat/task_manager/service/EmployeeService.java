package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.EmployeeDto;
import com.nuclear_kat.task_manager.entity.Employee;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface EmployeeService extends UserDetailsService {

    UserDetails loadUserByUsername(String email);

    String signUpEmployee(Employee employee);

    int enableEmployee(String email);

    List<EmployeeDto> getAllEmployeesWithRoles();

}
