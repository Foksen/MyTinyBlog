package ru.mirea.post_service.exception;

public class PostAlreadyExistsException extends RuntimeException {
    public PostAlreadyExistsException(String message) {
        super(message);
    }
}
