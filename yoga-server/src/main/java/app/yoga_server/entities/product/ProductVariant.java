package app.yoga_server.entities.product;

import app.yoga_server.entities.variant.Variant;
import app.yoga_server.entities.variant.VariantType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_product_variant")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class ProductVariant {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private Double price_modifier;

  @ManyToOne
  @JoinColumn(name = "variant_type_id", referencedColumnName = "id")
  private VariantType variantType;

  @ManyToOne
  @JoinColumn(name = "variant_id", referencedColumnName = "id")
  private Variant variant;

  @ManyToOne
  @JoinColumn(name = "product_id", referencedColumnName = "id")
  private Product product;
}
