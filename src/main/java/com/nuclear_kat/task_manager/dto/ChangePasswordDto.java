package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// ChangePasswordDto - запрос на смену пароля, содержит старый и новый пароль
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {

    private String currentPassword;
    private String newPassword;
}
