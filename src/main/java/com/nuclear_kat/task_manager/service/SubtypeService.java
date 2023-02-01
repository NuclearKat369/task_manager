package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.entity.Subtype;

import java.util.List;

public interface SubtypeService {

    List<Subtype> getAllSubtypes();
//
//    void saveSubtype(Subtype subtype);

    Subtype getSubtype(int subtypeId);

    void deleteSubtype(int subtypeId);
}
