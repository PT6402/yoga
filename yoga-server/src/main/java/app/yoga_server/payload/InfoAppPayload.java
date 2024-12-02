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
public class InfoAppPayload {
  private String email;
  private String phone;
  private String address;
  private String[] linkFanPage;
  private MultipartFile logoApp;
  private String sloganApp;
}
