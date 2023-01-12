package com.nuclear_kat.task_manager.dao;

import com.nuclear_kat.task_manager.dto.TaskStatusCountDto;
import com.nuclear_kat.task_manager.entity.Status;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.List;

@Repository
public class StatusRepositoryCriteriaImpl implements StatusRepositoryCriteria {

    @PersistenceContext
    EntityManager em;

    /*  Подсчёт количества заявок с определённым статусом
    select status.status_id, status_name, count (tasks.task_status) as status_count
    from status left join tasks on tasks.task_status=status.status_id
    group by status.status_id */
    @Override
    public List<TaskStatusCountDto> taskStatusCountDto() {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<TaskStatusCountDto> cq = cb.createQuery(TaskStatusCountDto.class);
        Root<Status> statusRoot = cq.from(Status.class);
        Join<Object, Object> tasks = statusRoot.join("tasks", JoinType.LEFT);

        Join<Object, Object> subStatuses = tasks.join("taskStatus", JoinType.LEFT);

        cq.select(cb.construct(
                TaskStatusCountDto.class,
                statusRoot.get("statusId").alias("status_id"),
                statusRoot.get("statusName").alias("status_name"),
                cb.count(subStatuses.get("statusId")).alias("status_count")
        ));
        cq.groupBy(statusRoot.get("statusId"), statusRoot.get("statusName"));
        TypedQuery<TaskStatusCountDto> query = em.createQuery(cq);
        List<TaskStatusCountDto> results = query.getResultList();
        return results;
    }
}
