package ru.mirea.gateway.service;

import ru.mirea.gateway.dto.AuthenticationRequest;
import ru.mirea.gateway.dto.AuthenticationResponse;

public interface AuthenticationService {
    AuthenticationResponse login(AuthenticationRequest request) throws Exception;
    AuthenticationResponse signUp(AuthenticationRequest request) throws Exception;
}
