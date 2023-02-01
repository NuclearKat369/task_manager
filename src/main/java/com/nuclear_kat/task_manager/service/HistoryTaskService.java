package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dto.HistoryTaskDto;

import java.util.List;

public interface HistoryTaskService {

    List<HistoryTaskDto> getAllTaskHistory(int taskId);
}