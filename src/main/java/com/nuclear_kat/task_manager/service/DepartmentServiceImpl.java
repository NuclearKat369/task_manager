package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.DepartmentRepository;
import com.nuclear_kat.task_manager.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
