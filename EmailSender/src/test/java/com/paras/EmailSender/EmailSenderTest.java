package com.paras.EmailSender;

import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.*;

@SpringBootTest
public class EmailSenderTest {

    @Autowired
    private EmailService emailService;
    @Test
    void emailSendTest()
    {
        System.out.println("sending email");
        emailService.sendEmail("py080398@gmail.com","Email form spring boot","this email is send using spring boot " );

    }
    @Test
    void sendHmlInEmail() throws MessagingException {
        String html=""+"<h1 style='color:red; border:1px solid red;'> Welcome to the world </h1>"+"";
        emailService.sendEmailWithHtml("py080398@gmail.com","Email from spring boot ",html);
    }

    @Test
    void sendEmailWithFile() throws MessagingException {
        emailService.sendEmailWithFile("py080398@gmail.com","email with file ","this is testing ",new File("C:\\Users\\PARAS YADAV\\EmailSender\\src\\main\\resources\\static\\OIP.jpeg"));
    }

    @Test
    void sendEmailWithFileWithInputStream() throws MessagingException, IOException {
        File file =new File("C:\\Users\\PARAS YADAV\\EmailSender\\src\\main\\resources\\static\\OIP.jpeg");
        InputStream is =new FileInputStream(file);
        emailService.sendEmailWithFileWithInputStream("py080398@gmail.com","email with file ","this is testing ",is);
    }



}
