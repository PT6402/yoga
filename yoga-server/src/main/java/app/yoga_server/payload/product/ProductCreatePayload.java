package app.yoga_server.payload.product;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreatePayload {
  private String name;
  private String description;
  private String brand;
  private double price_base;
  private int category_id;
  List<ProductVariantPayload> productVariants;
  private MultipartFile[] files;
}
