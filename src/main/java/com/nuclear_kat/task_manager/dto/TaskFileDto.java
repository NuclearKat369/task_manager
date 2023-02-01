package com.nuclear_kat.task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/* TaskFileDto используется для получения только ID и названия файла из БД
 * без загрузки самого файла*/
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskFileDto {

    private String fileName;
    private int fileId;
}
