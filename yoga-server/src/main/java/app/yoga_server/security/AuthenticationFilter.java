package app.yoga_server.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import app.yoga_server.entities.user.User;
import app.yoga_server.service.jwt_service.IJwt;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {
  private final IJwt jwtService;
  private final CustomUserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    try {
      String jwt = getJwtFromRequest(request);
      if (jwt == null)
        throw new Exception("jwt not found in request");
      User user = jwtService.getUserByToken(jwt);
      if (user == null)
        throw new Exception("user not found by jwt");

      UserDetails userDetails = userDetailsService.loadUserById(user.getId());
      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
          userDetails.getAuthorities());
      authentication.setDetails(new WebAuthenticationDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authentication);
    } catch (Exception e) {
      log.warn("Warning at filter: {}", e.getMessage());
    }
    doFilter(request, response, filterChain);
  }

  private String getJwtFromRequest(HttpServletRequest httpRequest) {
    String bearerToken = httpRequest.getHeader("Authorization");
    if (bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7, bearerToken.length());
    } else {
      return null;
    }
  }
}
