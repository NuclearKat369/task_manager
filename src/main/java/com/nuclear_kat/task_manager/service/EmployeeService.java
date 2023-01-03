package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.EmployeeRegistrationDto;
import com.nuclear_kat.task_manager.entity.Employee;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface EmployeeService extends UserDetailsService {

    //    Employee save(EmployeeRegistrationDto registrationDto);
    UserDetails loadUserByUsername(String email);

    String signUpEmployee(Employee employee);

    public int enableEmployee(String email);

}
