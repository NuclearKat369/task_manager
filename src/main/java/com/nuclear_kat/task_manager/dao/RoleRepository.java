package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Collection<Role> findRoleByName(String name);
}
