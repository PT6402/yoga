package app.yoga_server.entities.variant;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import app.yoga_server.entities.product.ProductVariant;
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
@Table(name = "tb_variant_type")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VariantType {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(columnDefinition = "TEXT CHARACTER SET utf8mb4")
  private String name;

  @JsonIgnore
  @OneToMany(mappedBy = "variantType")
  private List<Variant> variants;

  @JsonIgnore
  @OneToMany(mappedBy = "variantType")
  private List<ProductVariant> productVariants;
}
