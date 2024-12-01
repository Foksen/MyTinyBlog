package ru.mirea.post_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mirea.post_service.exception.PostAlreadyExistsException;
import ru.mirea.post_service.exception.PostNotFoundException;
import ru.mirea.post_service.model.Post;
import ru.mirea.post_service.repository.PostRepository;

import java.time.Instant;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository repository;

    @Override
    public Post create(Post post) {
        if (post.getId() != 0 && read(post.getId()) != null) {
            throw new PostAlreadyExistsException("Couldn't create a post with id = " + post.getId());
        }
        post.setCreationTime(Instant.now());
        return repository.save(post);
    }

    @Override
    public List<Post> readAll() {
        return repository.findAll();
    }

    @Override
    public Post read(long id) {
        return repository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Couldn't find the post with id = " + id));
    }

    @Override
    public Post update(Post post, long id) {
        read(id);
        post.setId(id);
        return repository.save(post);
    }

    @Override
    public Post delete(long id) {
        Post oldPost = read(id);
        repository.deleteById(id);
        return oldPost;
    }
}
