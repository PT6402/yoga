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

public class ProductInfo {
  private String name;
  private String brand;
  private String description;
  private double price_base;
  private int category_id;
  private boolean newArrival;
}
