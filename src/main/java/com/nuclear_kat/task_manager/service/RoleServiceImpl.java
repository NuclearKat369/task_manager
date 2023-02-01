package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.RoleRepository;
import com.nuclear_kat.task_manager.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
