package ru.mirea.gateway.service;

import ru.mirea.gateway.model.User;

import java.util.List;

public interface UserService {
    User save(User user);
    User findByUsername(String username);
    List<User> findAll();
    void delete(long id);
}
