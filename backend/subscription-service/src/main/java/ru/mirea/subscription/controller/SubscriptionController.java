package ru.mirea.subscription.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.mirea.subscription.model.Subscription;
import ru.mirea.subscription.service.SubscriptionService;

@Controller
@RequestMapping("/subscriptions")
public class SubscriptionController {
    @Autowired
    SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<?> getSubscriptions() {
        return ResponseEntity.ok(subscriptionService.readAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSubscription(@PathVariable("id") long id) {
        return ResponseEntity.ok(subscriptionService.read(id));
    }

    @PostMapping
    public ResponseEntity<?> createSubscription(@RequestBody Subscription subscription) {
        return ResponseEntity.ok(subscriptionService.create(subscription));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubscription(@PathVariable("id") long id) {
        return ResponseEntity.ok(subscriptionService.delete(id));
    }
}
