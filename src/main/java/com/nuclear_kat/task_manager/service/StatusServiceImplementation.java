package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.StatusRepository;
import com.nuclear_kat.task_manager.entity.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StatusServiceImplementation implements StatusService{

    @Autowired
    private StatusRepository statusRepository;

    @Override
    @Transactional
    public List<Status> getAllStatuses() {
        return statusRepository.findAll(Sort.by(Sort.Direction.ASC, "statusId"));
    }

    @Override
    @Transactional
    public void saveStatus(Status status) {
        statusRepository.save(status);
    }

    @Override
    @Transactional
    public Status getStatus(int statusId) {
        Status status = null;
        Optional<Status> optional = statusRepository.findById(statusId);
        if(optional.isPresent()){
            status = optional.get();
        }
        return status;
    }

    @Override
    @Transactional
    public void deleteStatus(int statusId) {
        statusRepository.deleteById(statusId);
    }
}
