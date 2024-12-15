package ru.mirea.subscription.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${new.post.message.link}")
    private String link;

    public void sendNotification(String to, String title) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@gexample.com");
        message.setTo(to);
        message.setSubject("Вышел новый пост в читаемом блоге!");
        message.setText(buildMessageText(title));
        mailSender.send(message);
    }

    private String buildMessageText(String title) {
        return String.format(
                "Привет! В блоге, на который ты подписался вышла новая запись \"%s\". Ссылка на блог: %s",
                title, link
        );
    }
}
