package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.EmployeeRepository;
import com.nuclear_kat.task_manager.dto.EmployeeRegistrationDto;
import com.nuclear_kat.task_manager.entity.Employee;
import com.nuclear_kat.task_manager.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee save(EmployeeRegistrationDto registrationDto) {
        Employee employee =
                new Employee(registrationDto.getLastName(), registrationDto.getFirstName()
                        ,registrationDto.getPatronymic(), registrationDto.getEmail()
                , registrationDto.getPassword(), Arrays.asList(new Role("Сотрудник")));

        return employeeRepository.save(employee);

    }
}
