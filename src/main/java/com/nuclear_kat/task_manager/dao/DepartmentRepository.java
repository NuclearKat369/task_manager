package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {
}
