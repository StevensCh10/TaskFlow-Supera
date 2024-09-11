package com.supera.taskflow.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.supera.taskflow.dto.ResponseDTO;
import com.supera.taskflow.exception.CurrentPassword;
import com.supera.taskflow.exception.EntityAlreadyExists;
import com.supera.taskflow.exception.EntityNotFound;
import com.supera.taskflow.model.User;
import com.supera.taskflow.repository.UserRepo;
import com.supera.taskflow.security.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public User find(Long id){
        return repo.findById(id).orElseThrow(() -> new EntityNotFound(String.format("usuário com id %d não encontrado", id)));
    }

    public ResponseDTO addUser(User newUser){
        User userExist = repo.findByEmail(newUser.getEmail());
        if(userExist == null){
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            repo.save(newUser);
            String token = this.tokenService.generateToken(newUser);
            return new ResponseDTO(newUser, token);
        }
        throw new EntityAlreadyExists(String.format("Usuário com email %s já está cadastrado", newUser.getEmail()));
    }

    public User updateUser(User userUpdated){
        User userExist = repo.findByEmail(userUpdated.getEmail());
        if(userExist == null){
            return repo.saveAndFlush(userUpdated);
        }
        throw new EntityAlreadyExists(String.format("Usuário com email %s já está cadastrado", userUpdated.getEmail()));
    }

    public User updatePassword(User user, String oldPassword, String newPassword){
        if(passwordEncoder.matches(oldPassword, user.getPassword())){
            if(oldPassword.equals(newPassword)){
                throw new CurrentPassword("Sua nova senha já é a atual");
            }else{
                user.setPassword(passwordEncoder.encode(newPassword));
                repo.saveAndFlush(user);
                return user;
            }
        }else{
            throw new EntityNotFound("Senha atual inválida");
        }
    }

    public void deleteUser(Long id){
        find(id);
        repo.deleteById(id);
    }
}