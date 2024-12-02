package app.yoga_server.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import app.yoga_server.entities.product.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Table(name = "tb_category")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(columnDefinition = "TEXT CHARACTER SET utf8mb4")
  private String name;

  private String image;

  @JsonIgnore
  @OneToMany(mappedBy = "category")
  private List<Product> products;
}
