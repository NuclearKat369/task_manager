package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.EmployeeFullDto;
import com.nuclear_kat.task_manager.dto.EmployeeNoRolesDto;
import com.nuclear_kat.task_manager.entity.*;
import com.nuclear_kat.task_manager.security.JwtService;
import com.nuclear_kat.task_manager.dao.EmployeeRepository;
import com.nuclear_kat.task_manager.dao.RoleRepository;
import com.nuclear_kat.task_manager.dto.EmployeeDto;
import com.nuclear_kat.task_manager.auth.token.confirm.ConfirmationToken;
import com.nuclear_kat.task_manager.auth.token.confirm.ConfirmationTokenServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

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
    private ConfirmationTokenServiceImpl confirmationTokenService;

    // Поиск пользователя по почте
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return employeeRepository
                .findEmployeeByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

    // Регистрация пользователя с генерацией токена подтверждения на почту
    public String signUpEmployee(Employee employee) {
        boolean employeeExists = employeeRepository.findEmployeeByEmail(employee.getEmail())
                .isPresent();
        if (employeeExists) {
            // TODO check if attributes are the same and
            // TODO if email not confirmed send confirmation email
            throw new IllegalStateException("Email already taken");
        }

        // Присвоение роли по умолчанию
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

    // Активация аккаунта пользователя
    public int enableEmployee(String email) {
        return employeeRepository.enableEmployee(email);
    }

    // Получение списка сотрудников с их ролями
    @Override
    public List<EmployeeDto> getAllEmployeesWithRoles() {
        List<Employee> allEmployees = employeeRepository.findAll();
        return getEmployeesDtoList(allEmployees);
    }

    public Employee getEmployeeByEmail(String email) {
        Employee employee = null;
        Optional<Employee> optional = employeeRepository.findEmployeeByEmail(email);
        if (optional.isPresent()) {
            employee = optional.get();
        }
        return employee;
    }

    @Override
    public List<EmployeeDto> getEmployeeByRole(int roleId) {
        List<Employee> employees = employeeRepository.findAllByRole(roleId);
        return getEmployeesDtoList(employees);
    }

    private List<EmployeeDto> getEmployeesDtoList(List<Employee> employeeList) {
        List<EmployeeDto> employeesDtoList = new ArrayList<>();
        for (Employee e : employeeList) {
            employeesDtoList.add(new EmployeeDto(
                    e.getUuid(),
                    e.getLastName(),
                    e.getFirstName(),
                    e.getPatronymic(),
                    e.getEmail(),
                    e.getRoles()
            ));
        }
        return employeesDtoList;
    }

    public Employee getEmployeeByUuid(UUID uuid) {
        Employee employee = null;
        Optional<Employee> optional = employeeRepository.findEmployeeByUuid(uuid);
        if (optional.isPresent()) {
            employee = optional.get();
        }
        return employee;
    }

    public EmployeeNoRolesDto getEmployeeNoRolesByUuid(UUID uuid) {
        EmployeeNoRolesDto employee = null;
        Optional<Employee> optional = employeeRepository.findEmployeeByUuid(uuid);
        if (optional.isPresent()) {
            employee = new EmployeeNoRolesDto(
                    optional.get().getUuid(),
                    optional.get().getLastName(),
                    optional.get().getFirstName(),
                    optional.get().getPatronymic(),
                    optional.get().getEmail());
        }
        return employee;
    }

    public EmployeeFullDto getEmployeeInfoByUuid(UUID uuid) {
        EmployeeFullDto employeeFullDto = null;
        Optional<Employee> optional = employeeRepository.findEmployeeByUuid(uuid);
        if (optional.isPresent()) {
            employeeFullDto = new EmployeeFullDto(
                    optional.get().getUuid(),
                    optional.get().getLastName(),
                    optional.get().getFirstName(),
                    optional.get().getPatronymic(),
                    optional.get().getEmail(),
                    optional.get().getRoles(),
                    optional.get().getEmployeePosition(),
                    optional.get().getEmployeeDepartment());
        }
        return employeeFullDto;
    }

    @Override
    public EmployeeFullDto saveEmployee(EmployeeFullDto employeeFullDto, String employeeId) {
        Employee employee = entityFromEmployeeFullDto(employeeFullDto, employeeId);
        Employee savedEmployee = employeeRepository.save(employee);
        EmployeeFullDto response = new EmployeeFullDto(
                savedEmployee.getUuid(),
                savedEmployee.getLastName(),
                savedEmployee.getFirstName(),
                savedEmployee.getPatronymic(),
                savedEmployee.getEmail(),
                savedEmployee.getRoles(),
                savedEmployee.getEmployeePosition(),
                savedEmployee.getEmployeeDepartment());
        System.out.println(response);
        return response;
    }

    // Получение Employee из access token
    public Employee getEmployeeFromToken(HttpServletRequest request) {
        return getEmployeeByEmail(
                jwtService.extractUsername(
                        request.getHeader(AUTHORIZATION).substring(7)));
    }

    private Employee entityFromEmployeeFullDto(EmployeeFullDto employeeFullDto, String employeeId) {
        Employee employee = getEmployeeByUuid(UUID.fromString(employeeId));
        Position position = employeeFullDto.getPosition();
        Department department = employeeFullDto.getDepartment();
        employee.setLastName(employeeFullDto.getLastName());
        employee.setFirstName(employeeFullDto.getFirstName());
        employee.setPatronymic(employeeFullDto.getPatronymic());
        employee.setEmail(employeeFullDto.getEmail());
        employee.setRoles(employeeFullDto.getRoles());
        position.addEmployeePosition(employee);
        department.addEmployeeDepartment(employee);

        return employee;
    }
}
