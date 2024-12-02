package app.yoga_server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_info_app")
public class InfoApp {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String email;
  private String phone;
  private String address;
  private String[] linkFanPage;
  private String logoApp;
  private String sloganApp;

  // bank
  private String bankStk;
  private String bankName;
  private String bankOwnerName;
  private String bankQRCode;

}
