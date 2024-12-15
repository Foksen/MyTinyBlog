package ru.mirea.post.client;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import ru.mirea.post.dto.NotifySubscribersRequest;

@Component
public class SubscribersClientImpl implements SubscribersClient {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Value("${gateway.host}")
    private String host;

    @Value("${gateway.port}")
    private String port;

    private WebClient webClient;

    @PostConstruct
    public void init() {
        webClient = webClientBuilder
                .baseUrl(String.format("http://%s:%s/subscribers/notify", host, port))
                .build();
    }

    @Override
    public Mono<ResponseEntity<Void>> notifySubscribers(NotifySubscribersRequest request, String token) {
        return webClient.post()
                .headers(httpHeaders -> httpHeaders.add("Authorization", token))
                .bodyValue(request)
                .retrieve().toBodilessEntity();
    }
}
