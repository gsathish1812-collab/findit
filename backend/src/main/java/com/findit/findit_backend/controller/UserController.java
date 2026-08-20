package com.findit.findit_backend.controller;

import com.findit.findit_backend.dto.LoginRequest;
import com.findit.findit_backend.model.User;
import com.findit.findit_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {
        return userService.registerUser(user);
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }
}