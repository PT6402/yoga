package app.yoga_server.entities.variant;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import app.yoga_server.entities.product.ProductVariant;
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
@Table(name = "tb_variant")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class Variant {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(columnDefinition = "TEXT CHARACTER SET utf8mb4")
  private String value;

  @ManyToOne
  @JoinColumn(name = "variant_type_id", referencedColumnName = "id")
  private VariantType variantType;

  @JsonIgnore
  @OneToMany(mappedBy = "variant")
  private List<ProductVariant> productVariants;
}
