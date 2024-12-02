package app.yoga_server.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VariantPayload {
  private String nameVariantType;
  private String[] valueVariants;
}
