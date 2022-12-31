package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.EmployeeRegistrationDto;
import com.nuclear_kat.task_manager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/registration")
public class EmployeeRegistrationController {

    @Autowired
    EmployeeService employeeService;

    public String registerEmployeeAccount(@ModelAttribute("employee")EmployeeRegistrationDto registrationDto){

        employeeService.save(registrationDto);
        return "done";

    }
}
