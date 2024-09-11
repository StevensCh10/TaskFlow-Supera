package com.supera.taskflow.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.supera.taskflow.exception.EntityAlreadyExists;
import com.supera.taskflow.exception.EntityNotFound;
import com.supera.taskflow.model.Task;
import com.supera.taskflow.repository.TaskRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepo repo;

    public Task find(Long id){
        return repo.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Produto com id %d não encontrado", id)));
    }

    public Task addTask(Task newTask){
        if(repo.findByName(newTask.getName()) == null){
            return repo.save(newTask);
        }
        throw new EntityAlreadyExists(String.format("Nome '%s' indisponível.", newTask.getName()));
    }

    public Task updateTask(Task taskUpdated){
        if(repo.findByName(taskUpdated.getName()) == null){
            return repo.save(taskUpdated);
        }
        throw new EntityAlreadyExists(String.format("Nome '%s' indisponível.", taskUpdated.getName()));
    }

    public void deleteTask(Long id){
        find(id);
        repo.deleteById(id);
    }

    public List<Task> allTasksByUser(Long userID){
        List<Task> results = repo.findAllByUser(userID);
        if (results == null) {
            results = new ArrayList<>();
        }   
        return results;
    }
}
