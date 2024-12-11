package ru.mirea.post.client;

import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;
import ru.mirea.post.dto.NotifySubscribersRequest;

public interface SubscribersClient {
    Mono<ResponseEntity<Void>> notifySubscribers(NotifySubscribersRequest request, String token);
}
