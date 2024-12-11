package ru.mirea.post.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mirea.post.model.Post;
import ru.mirea.post.service.PostService;

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
    public ResponseEntity<?> createPost(@RequestBody Post post, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(postService.create(post, token));
    }

    @DeleteMapping
    public ResponseEntity<?> deletePosts() {
        postService.deleteAll();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") long id) {
        return ResponseEntity.ok(postService.delete(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable("id") long id, @RequestBody Post post) {
        return ResponseEntity.ok(postService.update(post, id));
    }
}
