package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.PositionRepository;
import com.nuclear_kat.task_manager.entity.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionServiceImpl implements PositionService{

    @Autowired
    PositionRepository positionRepository;
    @Override
    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }
}
