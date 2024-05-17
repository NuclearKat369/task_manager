package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.SubtypeRepository;
import com.nuclear_kat.task_manager.entity.Subtype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SubtypeServiceImpl implements SubtypeService {

    @Autowired
    private SubtypeRepository subtypeRepository;

    // Получить все подтипы заявок
    @Override
    @Transactional
    public List<Subtype> getAllSubtypes() {
        return subtypeRepository.findAll(Sort.by(Sort.Direction.ASC, "subtypeId"));
    }

//    // Сохранить подтип
//    @Override
//    @Transactional
//    public void saveSubtype(Subtype subtype) {
//        subtypeRepository.save(subtype);
//    }

    // Получить подтип по ID
    @Override
    @Transactional
    public Subtype getSubtype(int subtypeId) {
        Subtype subtype = null;
        System.out.println("subtypeId IN SubtypeServiceImpl " + subtypeId);
        Optional<Subtype> optional = subtypeRepository.findById(subtypeId);
        if (optional.isPresent()) {
            subtype = optional.get();
        }
        return subtype;
    }

//    // Удалить подтип
//    @Override
//    @Transactional
//    public void deleteSubtype(int subtypeId) {
//        subtypeRepository.deleteById(subtypeId);
//    }
}
