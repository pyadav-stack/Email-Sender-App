package com.paras.EmailSender;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

@Service
public class EmailServiceImp implements EmailService{


    private JavaMailSender mailSender;
    public EmailServiceImp(JavaMailSender mailSender)
    {
        this.mailSender=mailSender;
    }
    @Override
    public void sendEmail(String to, String subject, String message) {
        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        mailSender.send(simpleMailMessage);

    }

    @Override
    public void sendEmail(String[] to, String subject, String message) {
        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        mailSender.send(simpleMailMessage);
    }

    @Override
    public void sendEmailWithHtml(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage simpleMailMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(simpleMailMessage,true,"UTF-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setFrom("parasydv625@gmail.com");
        helper.setText(htmlContent,true);
        mailSender.send(simpleMailMessage);


    }

    @Override
    public void sendEmailWithFile(String to, String subject, String message, File file) throws MessagingException {
        MimeMessage mimeMessage=mailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(mimeMessage,true);
        helper.setTo(to);
        helper.setFrom("parasydv625@gmail.com");
        helper.setText(message,true);
        helper.setSubject(subject);
        FileSystemResource fileSystemResource=new FileSystemResource(file);
        helper.addAttachment(fileSystemResource.getFilename(),file);
        mailSender.send(mimeMessage);

    }

    @Override
    public void sendEmailWithFileWithInputStream(String to, String subject, String message , InputStream is) throws MessagingException, IOException {
        MimeMessage mimeMessage=mailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(mimeMessage,true);
        helper.setTo(to);
        helper.setFrom("parasydv625@gmail.com");
        helper.setText(message,true);
        helper.setSubject(subject);
        File file=new File("test.png");
        Files.copy(is,file.toPath(), StandardCopyOption.REPLACE_EXISTING);
        FileSystemResource fileSystemResource=new FileSystemResource(file);
        helper.addAttachment(fileSystemResource.getFilename(),file);
        mailSender.send(mimeMessage);

    }

}
