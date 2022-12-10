package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.dto.TaskStatusCountDto;
import com.nuclear_kat.task_manager.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository <Status, Integer>, StatusRepositoryCriteria {

}
