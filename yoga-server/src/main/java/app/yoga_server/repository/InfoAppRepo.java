package app.yoga_server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import app.yoga_server.entities.InfoApp;

@Repository
public interface InfoAppRepo extends JpaRepository<InfoApp, Integer> {
  @Query(value = "select *from tb_info_app limit 1", nativeQuery = true)
  Optional<InfoApp> findFirst();
}
