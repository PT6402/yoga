package app.yoga_server.service.mail_service;

import java.io.File;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailImpl implements IMail {
  private final JavaMailSender javaMailSender;

  @Value("${spring.mail.username}")
  private String formEmail;

  @Async
  @Override
  public CompletableFuture<Boolean> sendHtmlMail(String to, String subject, String htmlBody) {
    try {
      MimeMessage mimeMessage = javaMailSender.createMimeMessage();
      MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
      mimeMessageHelper.setFrom(formEmail);
      mimeMessageHelper.setTo(to);
      mimeMessageHelper.setSubject(subject);
      mimeMessageHelper.setText(htmlBody, true); // `true` indicates that the text is HTML

      // Attach the logo image inline
      // String logoPath = "src/main/resources/static/image/project_logo.jpg";
      // FileSystemResource res = new FileSystemResource(new File(logoPath));
      // mimeMessageHelper.addInline("logoImage", res);

      javaMailSender.send(mimeMessage);
      return CompletableFuture.completedFuture(true);
    } catch (MessagingException e) {
      e.printStackTrace();
      return CompletableFuture.completedFuture(false);
    }
  }
}
