package ru.mirea.post_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.post_service.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
