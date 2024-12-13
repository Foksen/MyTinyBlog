package ru.mirea.gateway.dto;

import ru.mirea.gateway.model.UserRole;

public record SignUpRequest(String username, String password, UserRole userRole, String email) {
}
