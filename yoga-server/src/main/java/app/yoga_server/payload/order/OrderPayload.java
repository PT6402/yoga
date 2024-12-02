package app.yoga_server.payload.order;

import java.util.List;

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
public class OrderPayload {
  private String fullname;
  private String email;
  private String phone;
  private String address;
  private String message;

  List<OrderItemPayload> itemCart;
}
