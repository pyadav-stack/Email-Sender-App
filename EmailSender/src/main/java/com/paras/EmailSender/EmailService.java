package com.paras.EmailSender;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

public interface EmailService {

    void sendEmail(String to, String subject, String message);

    void sendEmail(String[] to, String subject, String message);

    void sendEmailWithHtml(String to, String subject, String htmlContent) throws MessagingException;

    void sendEmailWithFile(String to, String subject, String message, File file) throws MessagingException;

    void sendEmailWithFileWithInputStream(String to, String subject, String message, InputStream is) throws MessagingException, IOException;

}
