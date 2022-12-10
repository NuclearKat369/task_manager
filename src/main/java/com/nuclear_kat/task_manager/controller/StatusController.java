package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.dto.TaskStatusCountDto;
import com.nuclear_kat.task_manager.entity.Status;
import com.nuclear_kat.task_manager.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/showStatus")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @GetMapping("/getStatus/all")
    public List<Status> showAllStatuses() {
        List<Status> allStatuses = statusService.getAllStatuses();

        return allStatuses;
    }

    @GetMapping("/getStatus/{statusId}")
    public Status getStatus(@PathVariable int statusId) {
        Status status = statusService.getStatus(statusId);

        return status;
    }

    @GetMapping("/getNumberByStatus")
    public List<TaskStatusCountDto> countTasksByTaskStatus(){
        return statusService.countTasksByTaskStatus();
    }
}
