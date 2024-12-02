package app.yoga_server.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import app.yoga_server.entities.user.User;
import app.yoga_server.repository.user.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepo userRepo;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    try {
      User user = userRepo.findByEmail(email)
          .orElseThrow(() -> new UsernameNotFoundException("user not found by email"));
      return UserGlobal.createUser(user);
    } catch (Exception e) {
      log.error(e.getMessage());
      return null;
    }
  }

  public UserDetails loadUserById(int id) throws UsernameNotFoundException {
    try {
      User user = userRepo.findById(id)
          .orElseThrow(() -> new UsernameNotFoundException("user not found by id"));
      return UserGlobal.createUser(user);
    } catch (Exception e) {
      log.error(e.getMessage());
      return null;
    }
  }
}
