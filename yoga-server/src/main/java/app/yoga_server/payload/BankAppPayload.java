package app.yoga_server.payload;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankAppPayload {
  private String bankStk;
  private String bankName;
  private String bankOwnerName;
  private MultipartFile bankQRCode;
}
