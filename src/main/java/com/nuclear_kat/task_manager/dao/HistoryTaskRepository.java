package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.entity.HistoryTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;

@Repository
public interface HistoryTaskRepository extends JpaRepository<HistoryTask, Long> {

    /* вызывает пользовательскую функцию get_task_log(int N):
     * SELECT
     * 	ta.task_text as h_task_text,
     * 	ta.updated_at as h_updated_at,
     * 	employee.last_name as h_last_name,
     * 	employee.first_name as h_first_name,
     * 	employee.patronymic as patronymic
     * FROM
     *    (SELECT
     * 	distinct on (task_text) tasks_audit.task_text,
     * 	tasks_audit.task_id, MIN(tasks_audit.updated_at) AS updated_at, tasks_audit.modified_by
     * 	FROM
     *     tasks_audit
     * 	where task_id=N // определённое пользователем значение
     * 	group by task_text, task_id, modified_by
     * 	order by task_text, updated_at) as ta
     * INNER JOIN employee on employee.employee_id=ta.modified_by
     *
     */
    @Query(value = "SELECT h_task_id, h_task_text, h_updated_at, h_last_name, h_first_name, h_patronymic " +
            "FROM get_task_log(?1) ORDER BY h_updated_at DESC",
            nativeQuery = true)
    List<Tuple> findByTaskId(int taskId);
}