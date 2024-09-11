package com.supera.taskflow.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.supera.taskflow.model.Task;
import com.supera.taskflow.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class TaskController {
    
    private final TaskService service;

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public Task addTask(@Valid @RequestBody Task newTask){
        return service.addTask(newTask);
    }
    
    @PutMapping()
    @ResponseStatus(HttpStatus.OK)
    public Task updateTask(@Valid @RequestBody Task taskUpdated){
        return service.updateTask(taskUpdated);
    }

    @GetMapping("/{taskID}")
    public Task getTask(@PathVariable Long taskID){
        return service.find(taskID);
    }

    @GetMapping("/tasks/{userID}")
    public List<Task> getTasksByUser(@PathVariable Long userID){
        return service.allTasksByUser(userID);
    }

    @DeleteMapping("/{taskID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long taskID){
        service.deleteTask(taskID);
    }
}
