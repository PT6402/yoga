package app.yoga_server.repository.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.yoga_server.entities.product.ProductImage;
import jakarta.transaction.Transactional;

@Repository
public interface ProductImageRepo extends JpaRepository<ProductImage, Integer> {
  @Query("select pi from ProductImage pi where pi.product.id=:productId")
  List<ProductImage> findAllByProductId(@Param("productId") int productId);

  @Modifying
  @Transactional
  @Query("delete from ProductImage pi where pi.product.id=:productId")
  void removeByProductId(@Param("productId") int productId);

}
