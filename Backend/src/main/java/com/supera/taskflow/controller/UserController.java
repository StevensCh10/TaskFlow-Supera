package com.supera.taskflow.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.supera.taskflow.dto.UpdatePasswordRequest;
import com.supera.taskflow.model.User;
import com.supera.taskflow.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService service;

    @PutMapping()
    @ResponseStatus(HttpStatus.OK)
    public User updateUser(@Valid @RequestBody User updatedUser){
        return service.updateUser(updatedUser);
    }
    
    @PutMapping("/password")
    @ResponseStatus(HttpStatus.OK)
    public User updatePassword(@Valid @RequestBody UpdatePasswordRequest data){
        User user = data.user();
        String oldPassword = data.oldPassword();
        String newPassword = data.newPassword();
        return service.updatePassword(user, oldPassword, newPassword);
    }

    @GetMapping("/{userID}")
    public User getUser(@PathVariable Long userID){
        return service.find(userID);
    }

    @DeleteMapping("/{userID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long userID){
        service.deleteUser(userID);
    }

}
