package ru.mirea.subscription.service;

import ru.mirea.subscription.dto.NotifySubscribersRequest;

public interface SubscribersService {
    void notifySubscribers(NotifySubscribersRequest request);
}
