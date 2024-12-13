package ru.mirea.gateway.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ru.mirea.gateway.dto.SignInRequest;
import ru.mirea.gateway.dto.AuthenticationResponse;
import ru.mirea.gateway.dto.SignUpRequest;
import ru.mirea.gateway.model.User;
import ru.mirea.gateway.model.UserRole;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse signIn(SignInRequest request) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
        ));
        UserDetails user = userService.findByUsername(request.username());
        String jwt = jwtService.generateToken(user);
        return new AuthenticationResponse(jwt);
    }

    @Override
    public AuthenticationResponse signUp(SignUpRequest request) throws Exception {
        User user = User.builder()
                .username(request.username())
                .password(request.password())
                .role(request.userRole() != null ? request.userRole() : UserRole.NOT_SPECIFIED)
                .email(request.email())
                .build();
        userService.save(user);
        String jwt = jwtService.generateToken(user);
        return new AuthenticationResponse(jwt);
    }
}
