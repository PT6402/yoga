package app.yoga_server.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.yoga_server.entities.user.TokenUser;

@Repository
public interface TokenUserRepo extends JpaRepository<TokenUser, Integer> {
  Optional<TokenUser> findByRefreshToken(String refreshToken);
}
