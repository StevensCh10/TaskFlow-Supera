package com.supera.taskflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.supera.taskflow.model.User;

public interface UserRepo extends JpaRepository<User, Long>{
    
    User findByEmail(String email);
}
