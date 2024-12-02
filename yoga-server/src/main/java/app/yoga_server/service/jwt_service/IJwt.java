package app.yoga_server.service.jwt_service;

import org.springframework.security.core.Authentication;

import app.yoga_server.entities.user.User;

public interface IJwt {
  String generateAccessToken(Authentication authentication);

  String generateRefreshToken(Authentication authentication);

  String generateResetPassword(Authentication authentication);

  User getUserByToken(String token);
}
