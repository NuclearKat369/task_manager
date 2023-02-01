package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.HistoryTaskRepository;
import com.nuclear_kat.task_manager.dto.HistoryTaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
@Service
public class HistoryTaskServiceImpl implements HistoryTaskService {
    @Autowired
    private HistoryTaskRepository historyTaskRepository;

    @Override
    public List<HistoryTaskDto> getAllTaskHistory(int taskId) {
        List<HistoryTaskDto> historyTaskDtos = new ArrayList<>();
        List<Tuple> tuples = historyTaskRepository.findByTaskId(taskId);
        for (Tuple t : tuples) {
            String date = t.get("h_updated_at").toString().split("\\.")[0];
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
            HistoryTaskDto historyTaskDto = new HistoryTaskDto(
                    Integer.parseInt(t.get("h_task_id").toString()),
                    t.get("h_task_text").toString(),
                    dateTime,
                    t.get("h_last_name").toString(),
                    t.get("h_first_name").toString(),
                    t.get("h_patronymic").toString()
            );
            historyTaskDtos.add(historyTaskDto);
        }
        return historyTaskDtos;
    }
}
