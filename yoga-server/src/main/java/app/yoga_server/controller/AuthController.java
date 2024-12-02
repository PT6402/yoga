package app.yoga_server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.yoga_server.service.auth_service.IAuth;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
  private final IAuth authService;

  @PostMapping
  public ResponseEntity<?> login(
      @RequestParam String email,
      @RequestParam String password,
      HttpServletRequest request,
      HttpServletResponse response) {
    return authService.login(email, password, request, response);
  }

  @PostMapping("/change-password")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> changePassword(
      @RequestParam String email,
      @RequestParam String oldPassword,
      @RequestParam String newPassword) {
    return authService.changePassword(email, oldPassword, newPassword);
  }

  @GetMapping
  public ResponseEntity<?> refreshToken(
      HttpServletRequest request,
      HttpServletResponse response) {
    return authService.refreshToken(request, response);
  }

}
