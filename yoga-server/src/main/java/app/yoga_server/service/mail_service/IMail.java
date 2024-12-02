package app.yoga_server.service.mail_service;

import java.util.concurrent.CompletableFuture;

public interface IMail {
  CompletableFuture<Boolean> sendHtmlMail(String to, String subject, String htmlBody);
}
