package app.yoga_server.payload.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class OrderItemPayload {
  private int productId;
  private String[] variants;
  private double price;
  private int quantity;
}
