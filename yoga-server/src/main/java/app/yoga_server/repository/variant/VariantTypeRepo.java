package app.yoga_server.repository.variant;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.yoga_server.entities.variant.VariantType;

@Repository
public interface VariantTypeRepo extends JpaRepository<VariantType, Integer> {
  Optional<VariantType> findByName(String name);
}
