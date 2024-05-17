package com.nuclear_kat.task_manager.service;

import com.nuclear_kat.task_manager.dao.TaskRepository;
import com.nuclear_kat.task_manager.dto.*;
import com.nuclear_kat.task_manager.email.EmailBuilder;
import com.nuclear_kat.task_manager.email.EmailSender;
import com.nuclear_kat.task_manager.entity.Employee;
import com.nuclear_kat.task_manager.entity.Status;
import com.nuclear_kat.task_manager.entity.Subtype;
import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private SubtypeService subtypeService;
    @Autowired
    private StatusService statusService;
    @Autowired
    private EmailSender emailSender;
    @Autowired
    private EmailBuilder emailBuilder;
    private final String administrator = "alexeevaa@test.com";

    private final String link = "http://localhost:3000/task/";

    // Добавление заявки
    @Override
    public Task saveTask(TaskSubtypeDto taskSubtypeDto, HttpServletRequest request) {
        Task task = entityFromTaskSubtypeDto(taskSubtypeDto, request);
        Task savedTask = taskRepository.save(task);
        System.out.println(savedTask);

        // Письмо автору заявки
        emailSender.send(savedTask.getCreatedBy().getEmail(),
                emailBuilder.buildCreatedTaskEmail(savedTask, link + savedTask.getTaskId()),
                "Создана новая заявка №" + savedTask.getTaskId());

        // Письмо руководителю
        emailSender.send(administrator,
                emailBuilder.buildCreatedTaskEmail(savedTask, link + savedTask.getTaskId()),
                "Создана новая заявка №" + savedTask.getTaskId());

        return savedTask;
    }

    // Редактирование заявки
    @Override
    public TaskFullWithEmployeeInChargeDto saveTask(int taskId, UpdateTaskDto updateTaskDto, HttpServletRequest request) {
        Task task = entityFromUpdateTaskDto(taskId, updateTaskDto, request);
        Task savedTask = taskRepository.save(task);
        TaskFullWithEmployeeInChargeDto taskFullWithEmployeeInChargeDto = new TaskFullWithEmployeeInChargeDto(
                savedTask.getTaskStatus(),
                savedTask.getTaskSubtype(),
                savedTask.getTaskId(),
                savedTask.getTaskName(),
                savedTask.getTaskText(),
                savedTask.getCreatedAt(),
                savedTask.getCreatedBy().getUuid(),
                savedTask.getCreatedBy().getLastName(),
                savedTask.getCreatedBy().getFirstName(),
                savedTask.getCreatedBy().getPatronymic(),
                // employeeInCharge может вернуться со значением null, если не был ещё назначен
                savedTask.getEmployeeInCharge() != null ? savedTask.getEmployeeInCharge().getUuid() : null,
                savedTask.getEmployeeInCharge() != null ? savedTask.getEmployeeInCharge().getLastName() : "",
                savedTask.getEmployeeInCharge() != null ? savedTask.getEmployeeInCharge().getFirstName() : "",
                savedTask.getEmployeeInCharge() != null ? savedTask.getEmployeeInCharge().getPatronymic() : ""

        );
        System.out.println(savedTask);

        // Письмо автору заявки
        emailSender.send(savedTask.getCreatedBy().getEmail(),
                emailBuilder.buildUpdatedTaskEmail(savedTask, link + savedTask.getTaskId()),
                "Изменена заявка №" + savedTask.getTaskId());

        // Письмо ответственному, если не назначен, то руководителю
        String emailInCharge = savedTask.getEmployeeInCharge() != null
                ? savedTask.getEmployeeInCharge().getEmail()
                : administrator;
        emailSender.send(emailInCharge,
                emailBuilder.buildUpdatedTaskEmail(savedTask, link + savedTask.getTaskId()),
                "Изменена заявка №" + savedTask.getTaskId());
        return taskFullWithEmployeeInChargeDto;
    }

    // Получить заявку по ID
    @Override
    public Task getTask(int taskId) {
        Task task = null;
        Optional<Task> optional = taskRepository.findById(taskId);
        if (optional.isPresent()) {
            task = optional.get();
        }
        return task;
    }

    // Удалить заявку
    @Override
    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }

    // Получить список всех заявок со статусом и подтипом
    public List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtype() {
        List<TaskStatusSubtypeDto> list =
                getTaskEmployeeInCharge(taskRepository.getAllTasksWithStatusAndSubtype());
        return list;
    }

    // Получить заявку с её статусом и подтипом
    public TaskFullNoEmployeeInChargeDto getTaskFullInfo(int taskId) {
        return taskRepository.getTaskFullInfo(taskId);
    }

    // Получить список заявок с определённым статусом
    public List<TaskStatusSubtypeDto> getAllWithStatus(int statusId) {
        List<TaskStatusSubtypeDto> list =
                getTaskEmployeeInCharge(taskRepository.getAllWithStatusId(statusId));
        return list;
    }

    // Подсчёт всех заявок
    public long countTasksAll() {
        return taskRepository.countAllTasks();
    }

    // Получение списка List<EmployeeTasksDto> "сотрудник-задачи определённого статуса в работе"
    @Override
    public List<EmployeeTasksDto> getEmployeeTaskList() {
        return sortStatusCount(filterDuplicates(taskRepository.employeeTaskCountDto()));
    }

    // Получение ответственного за задачу
    @Override
    public EmployeeNoRolesDto getEmployeeInCharge(int taskId) {
        return taskRepository.findEmployeeInCharge(taskId);
    }

    // Получение заявок, созданных сотрудником, с информацией о статусе и подтипе
    @Override
    public List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtypeCreatedByEmployee(HttpServletRequest request) {
        List<TaskStatusSubtypeDto> list =
                getTaskEmployeeInCharge(taskRepository.getAllByCreatedBy(employeeService.getEmployeeFromToken(request).getUuid()));
        return list;
    }

    // Подсчёт всех созданных сотрудником заявок
    @Override
    public long countAllTasksCreated(HttpServletRequest request) {
        return taskRepository.countAllTasksByCreatedBy(employeeService.getEmployeeFromToken(request).getUuid());
    }

    // Получение заявок, назначенных сотруднику, с информацией о статусе и подтипе
    @Override
    public List<TaskStatusSubtypeDto> getAllTasksWithStatusAndSubtypeInCharge(HttpServletRequest request) {
        List<TaskStatusSubtypeDto> list =
                getTaskEmployeeInCharge(taskRepository.getAllInCharge(employeeService.getEmployeeFromToken(request).getUuid()));
        return list;
    }

    // Подсчёт всех назначенных заявок сотруднику
    @Override
    public long countAllTasksInCharge(HttpServletRequest request) {
        return taskRepository.countAllTasksInCharge(employeeService.getEmployeeFromToken(request).getUuid());
    }

    // Конвертация из DTO в объект класса Task, автор изменений берётся из email в access token
    private Task entityFromTaskSubtypeDto(TaskSubtypeDto taskSubtypeDto, HttpServletRequest request) {
        Task task = new Task();
        Employee employee = employeeService.getEmployeeFromToken(request);
        Subtype subtype = subtypeService.getSubtype(taskSubtypeDto.getSubtypeId());
        task.setCreatedBy(employee);
        task.setModifiedBy(employee);
        task.setTaskName(taskSubtypeDto.getTaskName());
        task.setTaskText(taskSubtypeDto.getTaskText());
        subtype.addTaskSubtype(task);

        return task;
    }

    // Конвертация из DTO в объект класса Task, автор изменений берётся из email в access token
    private Task entityFromUpdateTaskDto(int taskId, UpdateTaskDto updateTaskDto, HttpServletRequest request) {
        Task task = getTask(taskId);
        Employee employee = employeeService.getEmployeeFromToken(request);
        Status status = statusService.getStatus(updateTaskDto.getStatusId());
        Subtype subtype = subtypeService.getSubtype(updateTaskDto.getSubtypeId());
        Employee employeeInCharge = null;

        // Если изменяется заявка без назначения ответственного
        if (updateTaskDto.getEmployeeInCharge() != null &&
                !updateTaskDto.getEmployeeInCharge().isEmpty()) {
            employeeInCharge = employeeService.getEmployeeByUuid(UUID.fromString(updateTaskDto.getEmployeeInCharge()));
        }
        task.setModifiedBy(employee);
        task.setTaskName(updateTaskDto.getTaskName());

        // Если изменяется заявка без изменения текста
        if (updateTaskDto.getTaskText() != null &&
                !updateTaskDto.getTaskText().isEmpty()) {
            task.setTaskText(updateTaskDto.getTaskText());
        }
        task.setEmployeeInCharge(employeeInCharge);
        status.addTaskStatus(task);
        subtype.addTaskSubtype(task);

        return task;
    }

    // Добавление элементам List<TaskStatusSubtypeDto> данных о назначенном ответственном
    private List<TaskStatusSubtypeDto> getTaskEmployeeInCharge(List<TaskStatusSubtypeDto> list) {
        for (TaskStatusSubtypeDto t : list) {
            if (t.getEmployeeInCharge() != null)
                t.setEmployeeInCharge(employeeService.getEmployeeNoRolesByUuid(t.getEmployeeInCharge().getUuid()));
        }
        return list;
    }

    // Проверка наличия дубликатов по UUID и объединение в один элемент списка
    private List<EmployeeTasksDto> filterDuplicates(List<EmployeeTasksDto> list) {
        List<EmployeeTasksDto> newList = new ArrayList<>();
        for (int j = 0; j < list.size(); j++) {
            System.out.println("j = " + j);
            for (int k = j + 1; k < list.size(); k++) {
                if (k != j && list.get(j).getEmployeeId().equals(list.get(k).getEmployeeId())) {
                    // Объединение в один элемент списка
                    list.get(j).setEmployeeStatusCount(
                            Stream.concat(list.get(j).getEmployeeStatusCount().stream(),
                                            list.get(k).getEmployeeStatusCount().stream())
                                    .collect(Collectors.toList()));
                    /* Удаление дубликата с неполной информацией из списка и декремент k,
                     * чтобы не потерялся элемент */
                    list.remove(k);
                    k--;
                }
            }
            newList.add(list.get(j));
        }
        return newList;
    }

    // Сортировка списка EmployeeStatusCountDto у каждого сотрудника по ID статуса заявки
    private List<EmployeeTasksDto> sortStatusCount(List<EmployeeTasksDto> list) {
        List<EmployeeTasksDto> sortedList = new ArrayList<>(list);
        for (EmployeeTasksDto employeeTasksDto : list) {
            List<EmployeeStatusCountDto> employeeStatusCount = employeeTasksDto.getEmployeeStatusCount();

            employeeStatusCount.sort(Comparator.comparing(a -> a.getTaskStatus().getStatusId()));
            for (EmployeeStatusCountDto e : employeeStatusCount)
                System.out.println(employeeTasksDto.getEmployeeId() + " " + employeeTasksDto.getLastName() +
                        " " + e.getTaskStatus().getStatusId() + " " + e.getTaskStatus().getStatusName());
        }
        return sortedList;
    }
}

