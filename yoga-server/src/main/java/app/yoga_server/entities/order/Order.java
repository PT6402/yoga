package app.yoga_server.entities.order;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_order")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String fullname;
  private String phone;
  private String email;
  private String address;
  private Double totalPrice;
  private String message;

  private Boolean confirmStatus;
  private Boolean readStatus;

  @OneToMany(mappedBy = "order")
  @JsonIgnore
  private List<OrderItem> orders;

  @CreationTimestamp
  @JsonFormat(pattern = "dd-MM-yyy HH:mm:ss")
  @Column(nullable = false, updatable = false)
  private LocalDateTime createAt;
}
