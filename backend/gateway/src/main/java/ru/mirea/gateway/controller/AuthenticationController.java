package ru.mirea.gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mirea.gateway.dto.AuthenticationRequest;
import ru.mirea.gateway.service.AuthenticationService;
import ru.mirea.gateway.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return ResponseEntity.ok(authenticationService.login(authenticationRequest));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        return ResponseEntity.ok(authenticationService.signUp(authenticationRequest));
    }

    @GetMapping("/is-authorized")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("You're authorized :)");
    }
}
