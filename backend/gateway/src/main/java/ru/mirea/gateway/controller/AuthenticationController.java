package ru.mirea.gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mirea.gateway.dto.SignInRequest;
import ru.mirea.gateway.dto.SignUpRequest;
import ru.mirea.gateway.service.AuthenticationService;
import ru.mirea.gateway.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest signInRequest) throws Exception {
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) throws Exception {
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }

    @GetMapping("/is-authorized")
    public ResponseEntity<?> isAuthorized() {
        return ResponseEntity.ok("You're authorized :)");
    }
}
