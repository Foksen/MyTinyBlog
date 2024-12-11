package ru.mirea.subscription.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.mirea.subscription.dto.NotifySubscribersRequest;

@Controller
@RequestMapping("/subscribers")
public class SubscriberController {

    @PostMapping("/notify")
    public ResponseEntity<?> notifySubscribers(@RequestBody NotifySubscribersRequest request) {
        System.out.println(request.title() + request.content());
        return ResponseEntity.ok().build();
    }
}
