package ru.mirea.subscription.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ru.mirea.subscription.dto.NotifySubscribersRequest;

@Service
public class SubscribersServiceImpl implements SubscribersService {

    @Autowired
    private MailSenderService mailSenderService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Override
    @Async
    public void notifySubscribers(NotifySubscribersRequest request) {
        subscriptionService.readAll().forEach(subscription -> {
            mailSenderService.sendNotification(subscription.getEmail(), request.title());
        });
    }
}
