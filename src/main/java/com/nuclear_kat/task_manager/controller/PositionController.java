package com.nuclear_kat.task_manager.controller;

import com.nuclear_kat.task_manager.entity.Position;
import com.nuclear_kat.task_manager.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/positions")
public class PositionController {

    @Autowired
    PositionService positionService;

    @GetMapping
    public List<Position> getAllPositions(){
        return positionService.getAllPositions();
    }
}
