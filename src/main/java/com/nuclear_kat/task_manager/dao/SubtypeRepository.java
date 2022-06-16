package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.entity.Subtype;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubtypeRepository extends JpaRepository<Subtype, Integer> {
}
