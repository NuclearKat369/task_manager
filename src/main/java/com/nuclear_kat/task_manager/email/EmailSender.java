package com.nuclear_kat.task_manager.email;

public interface EmailSender {
    void send(String to, String email, String subject);
}
