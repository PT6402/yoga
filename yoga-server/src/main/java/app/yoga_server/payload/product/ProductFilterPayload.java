package app.yoga_server.payload.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductFilterPayload {
  private String brand;
  private Integer categoryId;
  private Integer[] price;
}
