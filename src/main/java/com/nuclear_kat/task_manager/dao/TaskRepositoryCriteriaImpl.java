package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.dto.EmployeeTasksDto;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.List;

@Repository
public class TaskRepositoryCriteriaImpl implements TaskRepositoryCriteria {
    @PersistenceContext
    EntityManager em;

    /*  Подсчёт количества заявок у каждого сотрудника в работе с учётом статуса заявки
        select
            employee.employee_id,
            employee.last_name,
            employee.first_name,
            employee.patronymic,
            count (tasks.task_employee_in_charge) as task_count,
            tasks.task_status,
            status.status_name
        from tasks
        left join employee on tasks.task_employee_in_charge=employee.employee_id
        left join status on status.status_id=tasks.task_status
        group by employee.employee_id, tasks.task_status, status.status_name    */
    @Override
    public List<EmployeeTasksDto> employeeTaskCountDto() {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<EmployeeTasksDto> cq = cb.createQuery(EmployeeTasksDto.class);
        Root<Task> taskRoot = cq.from(Task.class);
        Join<Object, Object> employee = taskRoot.join("employeeInCharge", JoinType.LEFT);


        cq.select(cb.construct(
                EmployeeTasksDto.class,
                employee.get("uuid").alias("employee_id"),
                employee.get("lastName").alias("last_name"),
                employee.get("firstName").alias("first_name"),
                employee.get("patronymic").alias("patronymic"),
                cb.count(taskRoot.get("employeeInCharge")).alias("task_count"),
                taskRoot.get("taskStatus").alias("task_status")

        ));
        cq.groupBy(employee.get("uuid"), taskRoot.get("taskStatus"));
        cq.where(cb.isNotNull(taskRoot.get("employeeInCharge")));
        TypedQuery<EmployeeTasksDto> query = em.createQuery(cq);
        List<EmployeeTasksDto> results = query.getResultList();
        return results;
    }
}
