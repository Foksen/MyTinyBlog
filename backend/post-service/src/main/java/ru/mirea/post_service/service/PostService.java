package ru.mirea.post_service.service;

import ru.mirea.post_service.model.Post;

import java.util.List;

public interface PostService {
    Post create(Post post);
    List<Post> readAll();
    Post read(long id);
    Post update(Post post, long id);
    Post delete(long id);
}
