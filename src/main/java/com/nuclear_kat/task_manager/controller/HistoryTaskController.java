package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.HistoryTaskDto;
import com.nuclear_kat.task_manager.service.HistoryTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/tasks-history")
public class HistoryTaskController {
    @Autowired
    HistoryTaskService historyTaskService;

    // Получение всей истории по заявке
    @GetMapping("/{taskId}")
    public List<HistoryTaskDto> getHistoryTask(@PathVariable int taskId) {
        List<HistoryTaskDto> list = historyTaskService.getAllTaskHistory(taskId);
        for(HistoryTaskDto h: list){
            System.out.println(h);
        }
        return list;
    }
}
