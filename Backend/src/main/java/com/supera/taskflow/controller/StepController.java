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

import com.supera.taskflow.model.Step;
import com.supera.taskflow.service.StepService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/step")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class StepController {
    
    private final StepService service;

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public Step addStep(@Valid @RequestBody Step newStep){
        return service.addStep(newStep);
    }
    
    @PutMapping()
    @ResponseStatus(HttpStatus.OK)
    public Step updateStep(@Valid @RequestBody Step stepUpdated){
        return service.updateStep(stepUpdated);
    }

    @GetMapping("/{stepID}")
    public Step getStep(@PathVariable Long stepID){
        return service.find(stepID);
    }

    @GetMapping("/steps/{taskname}")
    public List<Step> getStepsByTask(@PathVariable String taskname){
        return service.allStepsByTask(taskname);
    }

    @DeleteMapping("/{stepID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStep(@PathVariable Long stepID){
        service.deleteStep(stepID);
    }
}