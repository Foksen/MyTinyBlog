package ru.mirea.notification.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import ru.mirea.notification.dto.NewPostMessage;

@Service
public class EmailServiceImpl {

    @Autowired
    private JavaMailSender mailSender;

    @Value("new.post.message.link")
    private String link;

    public void sendNewPostMessage(NewPostMessage newPostMessage) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@gexample.com");
        message.setTo(newPostMessage.to());
        message.setSubject("В блоге опубликовали новую запись");
        message.setText(buildMessageText(newPostMessage.title()));
        mailSender.send(message);
    }

    private String buildMessageText(String title) {
        return String.format(
                "Привет! В блоге, на который ты подписался вышла новая запись \"%s\". Ссылка на блог: %s",
                title,
                link
        );
    }
}
