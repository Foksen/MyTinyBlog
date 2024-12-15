package ru.mirea.context_service;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FrontContextRepository extends JpaRepository<FrontContext, Integer> {
}
