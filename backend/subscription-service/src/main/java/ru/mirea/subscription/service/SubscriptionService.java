package ru.mirea.subscription.service;

import ru.mirea.subscription.model.Subscription;

import java.util.List;

public interface SubscriptionService {
    Subscription create(Subscription subscription);
    List<Subscription> readAll();
    Subscription read(long id);
    Subscription delete(long id);
}
