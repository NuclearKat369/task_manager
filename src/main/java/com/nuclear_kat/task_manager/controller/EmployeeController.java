package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.EmployeeDto;
import com.nuclear_kat.task_manager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<EmployeeDto> getAllEmployees() {
        List<EmployeeDto> list = employeeService.getAllEmployeesWithRoles();
        System.out.println(list);
        return list;
    }
}
