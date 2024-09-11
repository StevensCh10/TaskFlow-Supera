package com.supera.taskflow.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.supera.taskflow.dto.ResponseDTO;
import com.supera.taskflow.exception.EntityNotFound;
import com.supera.taskflow.model.User;
import com.supera.taskflow.repository.UserRepo;
import com.supera.taskflow.security.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepo repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public ResponseDTO authenticate(String email, String password) {
        var user = repository.findByEmail(email);
        if (user != null) {
            return invalidPassword(password, user);
        }
        throw new EntityNotFound("Email não encontrado");
    }

    private ResponseDTO invalidPassword(String password, User user){
        if(passwordEncoder.matches(password, user.getPassword())){
            String token = this.tokenService.generateToken(user);
            return new ResponseDTO(user, token);
        }else{
            throw new EntityNotFound("Senha inválida");
        }
    }
    
    public User findByEmail(String email){
        var user = repository.findByEmail(email);
        if(user != null){
            return user;
        }
        throw new EntityNotFound("Email não encontrado");
    }

}