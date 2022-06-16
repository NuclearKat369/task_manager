package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.entity.Subtype;

import java.util.List;

public interface SubtypeService {

    public List<Subtype> getAllSubtypes();

    public void saveSubtype(Subtype subtype);

    public Subtype getSubtype(int subtypeId);

    public void deleteSubtype(int subtypeId);
}
