package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.entity.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileDataRepository extends JpaRepository <FileData, Integer> {
}
