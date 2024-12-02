package app.yoga_server.payload.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductVariantPayload {
  private int variantTypeId;
  private int variantId;
  private double price_modifier;
}
