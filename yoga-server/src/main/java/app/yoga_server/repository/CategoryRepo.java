package app.yoga_server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.yoga_server.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
  Optional<List<Category>> findByName(String name);

  @Query("select c from Category c,Product p where p.category=c and p.status=true")
  List<Category> findAllForUser();
}
