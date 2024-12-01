package ru.mirea.gateway.service;

import ru.mirea.gateway.model.User;

public interface UserService {
    User save(User user);
    User findByUsername(String username);
}
