package ru.mirea.post.service;

import ru.mirea.post.model.Post;

import java.util.List;

public interface PostService {
    Post create(Post post, String token);
    List<Post> readAll();
    Post read(long id);
    Post update(Post post, long id);
    void deleteAll();
    Post delete(long id);
}
