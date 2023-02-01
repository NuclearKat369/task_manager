package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.StatusRepositoryCriteriaImpl;
import com.nuclear_kat.task_manager.dao.StatusRepository;
import com.nuclear_kat.task_manager.dto.TaskStatusCountDto;
import com.nuclear_kat.task_manager.entity.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private StatusRepositoryCriteriaImpl statusRepositoryCriteriaImpl;

    // Получить все статусы
    @Override
    @Transactional
    public List<Status> getAllStatuses() {
        return statusRepository.findAll(Sort.by(Sort.Direction.ASC, "statusId"));
    }

//    // Сохранить статус
//    @Override
//    @Transactional
//    public void saveStatus(Status status) {
//        statusRepository.save(status);
//    }

    // Получить статус по ID
    @Override
    @Transactional
    public Status getStatus(int statusId) {
        Status status = null;
        Optional<Status> optional = statusRepository.findById(statusId);
        if (optional.isPresent()) {
            status = optional.get();
        }
        return status;
    }

    // Подсчёт заявок с определённым статусом, возвращает список "Статус-количество"
    @Override
    @Transactional
    public List<TaskStatusCountDto> countTasksByTaskStatus() {
        return statusRepositoryCriteriaImpl.taskStatusCountDto();
    }

//    // Удалить статус
//    @Override
//    @Transactional
//    public void deleteStatus(int statusId) {
//        statusRepository.deleteById(statusId);
//    }
}
