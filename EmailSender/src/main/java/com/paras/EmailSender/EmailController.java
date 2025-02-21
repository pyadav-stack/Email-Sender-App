package com.paras.EmailSender;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/email")
@CrossOrigin
public class EmailController {

    @Autowired
    private EmailService service;

    @PostMapping("/send")
    public void sendEmail(@RequestBody EmailRequest request) throws MessagingException {
        service.sendEmailWithHtml(request.getTo(), request.getSubject(), request.getMessage());
    }

    @PostMapping("/send-with-file")
    public void  sendWithFile(@RequestPart("request") EmailRequest request,
                               @RequestPart("file") MultipartFile file) throws IOException, MessagingException {

        service.sendEmailWithFileWithInputStream(request.getTo(), request.getSubject(), request.getMessage(), file.getInputStream());

    }
}
