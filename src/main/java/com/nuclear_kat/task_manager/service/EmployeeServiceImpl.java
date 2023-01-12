package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.config.JwtService;
import com.nuclear_kat.task_manager.dao.EmployeeRepository;
import com.nuclear_kat.task_manager.dao.RoleRepository;
import com.nuclear_kat.task_manager.dto.EmployeeDto;
import com.nuclear_kat.task_manager.entity.Employee;
import com.nuclear_kat.task_manager.auth.token.confirm.ConfirmationToken;
import com.nuclear_kat.task_manager.auth.token.confirm.ConfirmationTokenService;
import com.nuclear_kat.task_manager.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final static String USER_NOT_FOUND_MSG = "Пользователь с почтой %s не найден";
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return employeeRepository
                .findEmployeeByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG)));
    }

    public String signUpEmployee(Employee employee) {
        boolean employeeExists = employeeRepository.findEmployeeByEmail(employee.getEmail())
                .isPresent();
        if (employeeExists) {
            //TODO check if attributes are the same and
            //TODO if email not confirmed send confirmation email
            throw new IllegalStateException("Email already taken");
        }

        Collection<Role> roles = roleRepository.findRoleByName("Сотрудник");
        employee.setRoles(roles);
        employeeRepository.save(employee);

        String jwt = jwtService.generateToken(employee);

        ConfirmationToken confirmationToken = new ConfirmationToken(
                jwt
                , LocalDateTime.now()
                , LocalDateTime.now().plusMinutes(15)
                , employee
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return jwt;
    }

    public int enableEmployee(String email) {
        return employeeRepository.enableEmployee(email);
    }

    @Override
    public List<EmployeeDto> getAllEmployeesWithRoles() {
        List<Employee> allEmployees = employeeRepository.findAll();
        List<EmployeeDto> allEmployeesDto = new ArrayList<>();
        for (int i = 0; i < allEmployees.size(); i++) {
            allEmployeesDto.add(new EmployeeDto(
                    allEmployees.get(i).getUuid(),
                    allEmployees.get(i).getLastName(),
                    allEmployees.get(i).getFirstName(),
                    allEmployees.get(i).getPatronymic(),
                    allEmployees.get(i).getEmail(),
                    allEmployees.get(i).getRoles()
            ));
        }
        return allEmployeesDto;
    }
}
