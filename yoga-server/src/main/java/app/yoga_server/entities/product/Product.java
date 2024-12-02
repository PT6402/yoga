package app.yoga_server.entities.product;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import app.yoga_server.entities.Category;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_product")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(columnDefinition = "TEXT CHARACTER SET utf8mb4")
  private String name;

  @Column(columnDefinition = "TEXT CHARACTER SET utf8mb4")
  private String brand;

  @Column(columnDefinition = "LONGTEXT CHARACTER SET utf8mb4")
  private String description;
  private Double price_base;

  private Boolean status;

  private Boolean newArrival;

  @JsonIgnore
  @OneToMany(mappedBy = "product")
  private List<ProductVariant> productVariants;

  @ManyToOne
  @JoinColumn(name = "category_id", referencedColumnName = "id")
  private Category category;

  @JsonIgnore
  @OneToMany(mappedBy = "product")
  private List<ProductImage> productImages;
}
