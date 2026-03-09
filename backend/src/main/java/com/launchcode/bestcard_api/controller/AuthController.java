package com.launchcode.bestcard_api.controller;

import com.launchcode.bestcard_api.service.AuthService;
import com.launchcode.bestcard_api.dto.AuthResponse;
import com.launchcode.bestcard_api.dto.LoginRequest;
import com.launchcode.bestcard_api.dto.SignupRequest;
import com.launchcode.bestcard_api.model.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(
            @Valid @RequestBody SignupRequest request) {

        User user = authService.signup(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new AuthResponse( "Signup successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
