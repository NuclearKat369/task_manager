package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository <Status, Integer> {

}
