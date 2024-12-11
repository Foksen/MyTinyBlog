package ru.mirea.subscription.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.mirea.subscription.model.Subscription;
import ru.mirea.subscription.repository.SubscriptionRepository;

import java.time.Instant;
import java.util.List;

@Service
public class SubscriptionServiceImpl implements SubscriptionService{
    @Autowired
    private SubscriptionRepository repository;

    @Override
    public Subscription create(Subscription subscription) {
        if (subscription.getId() != 0 && read(subscription.getId()) != null) {
            return null;
        }
        subscription.setCreationDate(Instant.now());
        return repository.save(subscription);
    }

    @Override
    public List<Subscription> readAll() {
        return repository.findAll();
    }

    @Override
    public Subscription read(long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Subscription delete(long id) {
        var oldSubscription = read(id);
        if (oldSubscription != null) {
            repository.deleteById(id);
        }
        return oldSubscription;
    }
}
