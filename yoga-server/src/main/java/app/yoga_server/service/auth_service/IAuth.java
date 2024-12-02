package app.yoga_server.service.auth_service;

import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface IAuth {
  ResponseEntity<?> register(String email, String password);

  ResponseEntity<?> login(String email, String password,
      HttpServletRequest request, HttpServletResponse response);

  ResponseEntity<?> changePassword(String email, String oldPassword, String newPassword);

  ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response);
}
