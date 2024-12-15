package ru.mirea.subscription.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.mirea.subscription.dto.NotifySubscribersRequest;
import ru.mirea.subscription.service.SubscribersService;

@Controller
@RequestMapping("/subscribers")
public class SubscriberController {

    @Autowired
    private SubscribersService subscribersService;

    @PostMapping("/notify")
    public ResponseEntity<?> notifySubscribers(@RequestBody NotifySubscribersRequest request) {
        subscribersService.notifySubscribers(request);
        return ResponseEntity.ok().build();
    }
}
