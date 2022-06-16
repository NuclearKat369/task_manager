package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.entity.Status;

import java.util.List;

public interface StatusService {

    public List<Status> getAllStatuses();

    public void saveStatus(Status status);

    public Status getStatus(int statusId);

    public void deleteStatus(int statusId);
}
