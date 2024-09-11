package com.supera.taskflow.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.supera.taskflow.exception.EntityAlreadyExists;
import com.supera.taskflow.exception.EntityNotFound;
import com.supera.taskflow.model.Step;
import com.supera.taskflow.repository.StepRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StepService {
    
    private final StepRepo repo;

    public Step find(Long id){
        return repo.findById(id).orElseThrow(() -> new EntityNotFound(String.format("Etapa com id %d não encontrada", id)));
    }

    public Step addStep(Step newStep){
        if(repo.findByName(newStep.getName()) == null){
            return repo.save(newStep);
        }
        throw new EntityAlreadyExists(String.format("Nome '%s' indisponível.", newStep.getName()));
    }

    public Step updateStep(Step stepUpdated){
        var step = repo.findByName(stepUpdated.getName());
        if(step == null || step.getId().equals(stepUpdated.getId())){
            return repo.saveAndFlush(stepUpdated);
        }
        throw new EntityAlreadyExists(String.format("Nome '%s' indisponível.", stepUpdated.getName()));
    }

    public void deleteStep(Long id){
        find(id);
        repo.deleteById(id);
    }

    public List<Step> allStepsByTask(String taskname){
        List<Step> results = repo.findAllByTask(taskname);
        if (results == null) {
            results = new ArrayList<>();
        }  
        return results;
    }
}