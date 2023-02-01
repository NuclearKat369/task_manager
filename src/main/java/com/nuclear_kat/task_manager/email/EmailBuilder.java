package com.nuclear_kat.task_manager.email;

import com.nuclear_kat.task_manager.entity.Task;

public interface EmailBuilder {

    String buildCreatedTaskEmail(Task task, String link);

    String buildUpdatedTaskEmail(Task task, String link);

    String buildConfirmEmail(String name, String link);

    String buildConfirmed(String email, String link);

}
