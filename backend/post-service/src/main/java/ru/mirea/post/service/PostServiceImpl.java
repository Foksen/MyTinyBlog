package ru.mirea.post.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mirea.post.client.SubscribersClient;
import ru.mirea.post.dto.NotifySubscribersRequest;
import ru.mirea.post.exception.PostAlreadyExistsException;
import ru.mirea.post.exception.PostNotFoundException;
import ru.mirea.post.model.Post;
import ru.mirea.post.repository.PostRepository;

import java.time.Instant;
import java.util.List;

@Service
@Slf4j
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository repository;

    @Autowired
    private SubscribersClient subscribersClient;

    @Override
    public Post create(Post post, String token) {
        if (post.getId() != 0 && read(post.getId()) != null) {
            throw new PostAlreadyExistsException("Couldn't create a post with id = " + post.getId());
        }
        post.setCreationDate(Instant.now());
        try {
            subscribersClient.notifySubscribers(new NotifySubscribersRequest(post.getTitle(), post.getContent()), token)
                    .block();
        } catch (Exception e) {
            log.error("Failed to notify subscribers, message: {}", e.getMessage());
        }
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
    public void deleteAll() {
        repository.deleteAll();
    }

    @Override
    public Post delete(long id) {
        Post oldPost = read(id);
        repository.deleteById(id);
        return oldPost;
    }
}
