package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.EmployeeDto;
import com.nuclear_kat.task_manager.dto.EmployeeFullDto;
import com.nuclear_kat.task_manager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Получение списка всех сотрудников без паролей
    @GetMapping
    public List<EmployeeDto> getAllEmployees() {
        List<EmployeeDto> list = employeeService.getAllEmployeesWithRoles();
        System.out.println(list);
        return list;
    }

    @GetMapping("/{roleId}")
    public List<EmployeeDto> getEmployeesByRole(@PathVariable int roleId) {
        List<EmployeeDto> list = employeeService.getEmployeeByRole(roleId);
        return list;
    }

    // Для проверки
    @GetMapping("/get-employee/{employeeId}")
    public EmployeeFullDto getEmployee(@PathVariable String employeeId) {
        return employeeService.getEmployeeInfoByUuid(UUID.fromString(employeeId));
    }

    @PutMapping("/{employeeId}")
    public EmployeeFullDto updateEmployee(@RequestBody EmployeeFullDto employeeFullDto, @PathVariable String employeeId){
        return employeeService.saveEmployee(employeeFullDto, employeeId);
    }

}
