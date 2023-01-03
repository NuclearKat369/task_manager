package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.EmployeeRegistrationDto;
import com.nuclear_kat.task_manager.registration.RegistrationRequest;
import com.nuclear_kat.task_manager.registration.RegistrationService;
import com.nuclear_kat.task_manager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
public class EmployeeRegistrationController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private RegistrationService registrationService;
//
//    @PostMapping
//    public String registerEmployeeAccount(@ModelAttribute("employee")EmployeeRegistrationDto registrationDto){
//
//        employeeService.save(registrationDto);
//        return "done";
//    }
//
//    @ModelAttribute("employee")
//    public EmployeeRegistrationDto employeeRegistrationDto(){
//
//        return new EmployeeRegistrationDto();
//    }

    @PostMapping
    public String register(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
