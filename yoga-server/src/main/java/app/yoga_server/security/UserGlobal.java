package app.yoga_server.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import app.yoga_server.entities.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserGlobal implements UserDetails {
  private Integer id;
  private String email;
  private String password;
  private Collection<? extends GrantedAuthority> authorities;

  public static UserGlobal createUser(User user) {
    return UserGlobal.builder()
        .email(user.getEmail())
        .id(user.getId())
        .password(user.getPassword())
        .build();
  }

  @Override
  public String getUsername() {
    return this.email;
  }
}
