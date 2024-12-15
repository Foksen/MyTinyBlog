package ru.mirea.context_service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FrontContextService {

    private static final FrontContext DEFAULT_FRONT_CONTEXT = FrontContext.builder()
            .data("data")
            .likes(0)
            .build();

    @Autowired
    private FrontContextRepository repository;

    public FrontContext getFrontContext() {
        if (repository.findById(1).orElse(null) == null) {
            log.error("Couldn't read front context properties, return defaults");
            return DEFAULT_FRONT_CONTEXT;
        }
        return repository.getReferenceById(1);
    }

    public void processReaction(boolean isPositive) {
        if (repository.findById(1).orElse(null) == null) {
            return;
        }
        FrontContext currentContext = repository.getReferenceById(1);
        int likesCount = currentContext.getLikes();
        if (isPositive) {
            likesCount += 1;
        }
        else {
            likesCount = Math.max(likesCount - 1, 0);
        }
        currentContext.setLikes(likesCount);
        repository.save(currentContext);
    }
}
