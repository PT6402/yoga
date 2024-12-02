package app.yoga_server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.yoga_server.payload.BankAppPayload;
import app.yoga_server.payload.InfoAppPayload;
import app.yoga_server.service.info_app_service.IInfoApp;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/infoApp")
public class InfoAppController {
  private final IInfoApp infoAppService;

  @GetMapping
  public ResponseEntity<?> getInfoApp() {
    var result = infoAppService.getInfoApp();
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/admin/info")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> updateInfo(@ModelAttribute InfoAppPayload payload) {
    var result = infoAppService.updateInfoApp(payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/admin/bank")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> updateBank(@ModelAttribute BankAppPayload payload) {
    var result = infoAppService.updateBankApp(payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }
}
