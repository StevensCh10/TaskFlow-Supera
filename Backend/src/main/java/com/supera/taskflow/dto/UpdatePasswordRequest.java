package com.supera.taskflow.dto;

import com.supera.taskflow.model.User;

public record UpdatePasswordRequest(User user, String oldPassword, String newPassword) {}
