package app.yoga_server.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import app.yoga_server.entities.user.TokenUser;
import app.yoga_server.repository.user.TokenUserRepo;
import app.yoga_server.utils.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
  private final TokenUserRepo tokenRepo;

  @Override
  public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    try {
      Cookie refreshToken = CookieUtils.getCookie(request, "refreshToken")
          .orElseThrow(() -> new Exception("refresh token not found in cookie"));
      TokenUser token = tokenRepo.findByRefreshToken(refreshToken.getValue())
          .orElseThrow(() -> new Exception("refresh token not found in database"));
      tokenRepo.deleteById(token.getId());
      CookieUtils.removeCookie(request, response, "refreshToken");
      SecurityContextHolder.clearContext();
    } catch (Exception e) {
      e.printStackTrace();
      log.warn(e.getMessage());
    }
  }
}
