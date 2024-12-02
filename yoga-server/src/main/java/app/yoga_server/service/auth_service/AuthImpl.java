package app.yoga_server.service.auth_service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.yoga_server.entities.user.TokenUser;
import app.yoga_server.entities.user.User;
import app.yoga_server.repository.user.TokenUserRepo;
import app.yoga_server.repository.user.UserRepo;
import app.yoga_server.security.CustomUserDetailsService;
import app.yoga_server.service.jwt_service.IJwt;
import app.yoga_server.utils.CookieUtils;
import app.yoga_server.utils.ResultUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthImpl implements IAuth {
  private final UserRepo userRepo;
  private final TokenUserRepo tokenRepo;
  private final PasswordEncoder passwordEncoder;
  private final IJwt jwtService;
  private final AuthenticationProvider authenticationProvider;
  private final CustomUserDetailsService customUserDetailsService;

  @Value("${app.auth.cookie_expired}")
  int cookieMaxAge;

  @Override
  public ResponseEntity<?> register(String email, String password) {
    try {
      tokenRepo.deleteAll();
      if (userRepo.findByEmail(email).isPresent())
        return ResponseEntity.ok("register success");
      User user = User.builder()
          .email(email)
          .password(passwordEncoder.encode(password))
          .build();
      userRepo.save(user);
      return ResponseEntity.ok("register success");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(ResultUtil.builder().status(false).message(e.getMessage()).build());
    }
  }

  @Override
  public ResponseEntity<?> login(String email, String password,
      HttpServletRequest request, HttpServletResponse response) {
    try {
      User user = userRepo.findByEmail(email).orElseThrow(() -> new Exception("email not found"));
      Authentication auth = authenticationProvider
          .authenticate(new UsernamePasswordAuthenticationToken(email, password));
      String refreshToken = jwtService.generateRefreshToken(auth);
      String accessToken = jwtService.generateAccessToken(auth);
      TokenUser token = TokenUser.builder()
          .ipAddress(request.getRemoteAddr())
          .infoDevice(request.getHeader("User-Agent"))
          .refreshToken(refreshToken)
          .user(user)
          .build();
      tokenRepo.save(token);
      CookieUtils.addCookie(response, "refreshToken", refreshToken, cookieMaxAge);
      return ResponseEntity.ok(accessToken);
    } catch (AuthenticationException e) {
      return ResponseEntity.badRequest().body(ResultUtil.builder().status(false).message(
          "email or password wrond").build());
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(ResultUtil.builder().status(false).message(e.getMessage()).build());
    }
  }

  @Override
  public ResponseEntity<?> changePassword(String email, String oldPassword, String newPassword) {
    try {
      User user = userRepo.findByEmail(email).orElseThrow(() -> new Exception("email not found"));
      authenticationProvider
          .authenticate(new UsernamePasswordAuthenticationToken(email, oldPassword));

      user.setPassword(passwordEncoder.encode(newPassword));
      userRepo.save(user);
      return ResponseEntity.ok()
          .body(ResultUtil.builder().status(true).message("change password success").build());
    } catch (AuthenticationException e) {
      return ResponseEntity.badRequest().body(ResultUtil.builder().status(false).message(
          "email or password wrond").build());
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(ResultUtil.builder().status(false).message(e.getMessage()).build());
    }
  }

  @Override
  public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {

    try {
      var refreshToken = CookieUtils.getCookie(request, "refreshToken");
      if (!refreshToken.isPresent()) {
        throw new Exception("refreshToken is not found cookie");
      }
      var token = tokenRepo.findByRefreshToken(refreshToken.get().getValue());
      if (!token.isPresent()) {
        throw new Exception("refreshToken is not found database");
      }
      if (!(token.get().getIpAddress().equals(request.getRemoteAddr()))
          && !(token.get().getInfoDevice().equals(request.getHeader("User-Agent")))) {
        throw new Exception("device invalid");
      }

      var user = jwtService.getUserByToken(token.get().getRefreshToken());
      if (user == null) {
        throw new Exception("token wrond");
      }
      UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
      Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null,
          userDetails.getAuthorities());
      String newAccessToken = jwtService.generateAccessToken(auth);
      return ResponseEntity.ok(newAccessToken);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
