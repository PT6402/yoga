package app.yoga_server.data;

import java.util.List;

import org.springframework.stereotype.Component;

import app.yoga_server.payload.BankAppPayload;
import app.yoga_server.payload.InfoAppPayload;
import app.yoga_server.service.auth_service.IAuth;
import app.yoga_server.service.info_app_service.IInfoApp;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GenerateInfoApp {
  private final IAuth authService;
  private final IInfoApp infoAppService;

  @PostConstruct
  public void init() {
    authService.register("admin@gmail.com", "admin123");
    infoAppService.addFirst(
        InfoAppPayload.builder()
            .email("yoga@gmail.com")
            .phone("0909090909")
            .linkFanPage(List.of("facebook",
                "http://localhost:3000").toArray(new String[0]))
            .address("quan 4,tp HCM")
            .sloganApp("this is slogan app")
            .build(),
        BankAppPayload.builder()
            .bankName("Sacombank")
            .bankOwnerName("chu shop yoga")
            .bankStk("0123456789")
            .build());
  }
}
