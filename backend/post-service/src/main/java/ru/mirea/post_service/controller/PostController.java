package ru.mirea.post_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mirea.post_service.model.Post;
import ru.mirea.post_service.service.PostService;

@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<?> getPosts() {
        return ResponseEntity.ok(postService.readAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") long id) {
        return ResponseEntity.ok(postService.read(id));
    }

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(postService.create(post));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") long id) {
        return ResponseEntity.ok(postService.delete(id));
    }
}
