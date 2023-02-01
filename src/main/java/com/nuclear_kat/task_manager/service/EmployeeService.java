package com.nuclear_kat.task_manager.service;


import com.nuclear_kat.task_manager.dto.EmployeeDto;
import com.nuclear_kat.task_manager.dto.EmployeeFullDto;
import com.nuclear_kat.task_manager.dto.EmployeeNoRolesDto;
import com.nuclear_kat.task_manager.entity.Employee;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

public interface EmployeeService extends UserDetailsService {

    UserDetails loadUserByUsername(String email);

    String signUpEmployee(Employee employee);

    int enableEmployee(String email);

    List<EmployeeDto> getAllEmployeesWithRoles();

    Employee getEmployeeByEmail(String email);

    List<EmployeeDto> getEmployeeByRole(int roleId);

    Employee getEmployeeByUuid(UUID uuid);

    EmployeeFullDto getEmployeeInfoByUuid(UUID uuid);

    EmployeeNoRolesDto getEmployeeNoRolesByUuid(UUID uuid);

    Employee getEmployeeFromToken(HttpServletRequest request);

    EmployeeFullDto saveEmployee(EmployeeFullDto employeeFullDto, String employeeId);

}