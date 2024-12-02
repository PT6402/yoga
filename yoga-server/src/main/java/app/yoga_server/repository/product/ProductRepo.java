package app.yoga_server.repository.product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.yoga_server.entities.product.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
        @Query("select p from Product p where p.category.id=:categoryId and p.name=:productName and p.brand=:productBrand")
        List<Product> findByCategoryIdAndNameAndBrand(
                        @Param("categoryId") int categoryId,
                        @Param("productName") String productName,
                        @Param("productBrand") String productBrand);

        @Query("SELECT MAX(pv.price_modifier) AS highestPriceModifier " +
                        "FROM Product p " +
                        "JOIN p.productVariants pv " +
                        "JOIN pv.variantType vt " +
                        "WHERE p.id = :productId AND vt.id = :typeId")
        Double findHighestPriceModifierByProductIdAndTypeId(@Param("productId") Integer productId,
                        @Param("typeId") Integer typeId);

        @Query("SELECT MIN(pv.price_modifier) AS highestPriceModifier " +
                        "FROM Product p " +
                        "JOIN p.productVariants pv " +
                        "JOIN pv.variantType vt " +
                        "WHERE p.id = :productId AND vt.id = :typeId")
        Double findLowestPriceModifierByProductIdAndTypeId(@Param("productId") Integer productId,
                        @Param("typeId") Integer typeId);

        @Query("select p from Product p where p.status=true")
        List<Product> findAllByStatus();

        @Query("select p from Product p where p.status=true and LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))")
        List<Product> findAllBySearch(@Param("search") String search);

        @Query("SELECT p FROM Product p " +
                        "WHERE (:categoryId IS NULL OR p.category.id = :categoryId) " +
                        "AND (:brand IS NULL OR p.brand = :brand) ")
        List<Product> filterProducts(
                        @Param("categoryId") Integer categoryId,
                        @Param("brand") String brand);

        @Query("select p from Product p  where p.status = true and p.newArrival =true")
        List<Product> findAllByNewArrival();

        @Query("select p from Product p  where p.status = true and p.id=:id")
        Optional<Product> findByIdWithStatus(@Param("id") int id);
}
