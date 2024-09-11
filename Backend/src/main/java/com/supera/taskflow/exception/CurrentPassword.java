package com.supera.taskflow.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CurrentPassword extends RuntimeException{
    public CurrentPassword(String message){
        super(message);
    }
}
