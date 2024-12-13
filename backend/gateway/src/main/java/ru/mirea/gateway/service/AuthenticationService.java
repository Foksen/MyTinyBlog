package ru.mirea.gateway.service;

import ru.mirea.gateway.dto.SignInRequest;
import ru.mirea.gateway.dto.AuthenticationResponse;
import ru.mirea.gateway.dto.SignUpRequest;

public interface AuthenticationService {
    AuthenticationResponse signIn(SignInRequest request) throws Exception;
    AuthenticationResponse signUp(SignUpRequest request) throws Exception;
}
