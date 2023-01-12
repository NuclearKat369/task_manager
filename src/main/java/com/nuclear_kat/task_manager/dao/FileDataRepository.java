package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.dto.TaskFileDto;
import com.nuclear_kat.task_manager.entity.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDataRepository extends JpaRepository <FileData, Integer> {

    @Query("SELECT new com.nuclear_kat.task_manager.dto.TaskFileDto(" +
            " fd.fileName, fd.fileId) " +
            "FROM FileData fd JOIN fd.fileTask t WHERE t.taskId=:taskId ORDER BY fd.fileName DESC")
    List<TaskFileDto> getFileDataByTaskId(int taskId);
}
