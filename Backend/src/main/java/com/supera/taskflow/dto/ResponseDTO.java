package com.supera.taskflow.dto;

import com.supera.taskflow.model.User;

public record ResponseDTO (User user, String token) { }