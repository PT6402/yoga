package app.yoga_server.service.jwt_service;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import app.yoga_server.entities.user.User;
import app.yoga_server.repository.user.UserRepo;
import app.yoga_server.security.UserGlobal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtImpl implements IJwt {

  @Value("${app.auth.token_secret}")
  String secretKey;

  @Value("${app.auth.access_token_expired}")
  Long accessTokenExpired;

  @Value("${app.auth.refresh_token_expired}")
  Long refreshTokenExpired;

  @Value("${app.auth.reset_pass_token_expired}")
  Long resetPasswordExpired;

  private final UserRepo userRepo;

  @Override
  public String generateAccessToken(Authentication authentication) {
    return createToken(authentication, new Date(System.currentTimeMillis() + accessTokenExpired));
  }

  @Override
  public String generateRefreshToken(Authentication authentication) {
    return createToken(authentication, new Date(System.currentTimeMillis() + refreshTokenExpired));
  }

  @Override
  public String generateResetPassword(Authentication authentication) {
    return createToken(authentication, new Date(System.currentTimeMillis() + resetPasswordExpired));
  }

  @Override
  public User getUserByToken(String token) {
    try {
      String id = parseToken(token, Claims::getSubject);
      User user = userRepo.findById(Integer.valueOf(id))
          .orElseThrow(() -> new UsernameNotFoundException("user not found by id"));
      return user;
    } catch (Exception e) {
      log.error(e.getMessage());
      return null;
    }
  }

  public String createToken(Authentication authentication, Date expirDate) {
    UserGlobal user = (UserGlobal) authentication.getPrincipal();
    SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    return Jwts.builder()
        .subject(user.getId().toString())
        .issuedAt(new Date())
        .expiration(expirDate)
        .signWith(key)
        .compact();

  }

  public <T> T parseToken(String jwt, Function<Claims, T> getClaims) {
    SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    try {
      Claims claims = (Claims) Jwts.parser().verifyWith(key).build().parse(jwt).getPayload();
      return getClaims.apply(claims);
    } catch (SignatureException ex) {
      log.error("Invalid JWT signature");
    } catch (MalformedJwtException ex) {
      log.error("Invalid JWT token");
    } catch (ExpiredJwtException ex) {
      log.error("Expired JWT token");
    } catch (UnsupportedJwtException ex) {
      log.error("Unsupported JWT token");
    } catch (IllegalArgumentException ex) {
      log.error("JWT claims string is empty.");
    }
    return null;
  }

}
