package app.yoga_server.repository.product;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.yoga_server.entities.product.ProductVariant;
import app.yoga_server.entities.variant.VariantType;
import jakarta.transaction.Transactional;

@Repository
public interface ProductVariantRepo extends JpaRepository<ProductVariant, Integer> {
        @Query("select pv from ProductVariant pv where pv.product.id=:productId")
        Optional<List<ProductVariant>> findByProductId(@Param("productId") int productId);

        @Modifying
        @Transactional
        @Query("delete from ProductVariant pv where pv.product.id=:productId")
        void removeProductVariantByProductId(@Param("productId") int productId);

        @Modifying
        @Transactional
        @Query("delete from ProductVariant pv where pv.variantType.id=:variantTypeId and pv.product.id=:productId")
        void removeProductVariantByVariantTypeAndProductId(
                        @Param("variantTypeId") int variantTypeId,
                        @Param("productId") int productId);

        @Query("select pv from ProductVariant pv where pv.variantType.id=:variantTypeId and pv.product.id=:productId")
        Optional<List<ProductVariant>> findProductVariantByVariantTypeAndProductId(
                        @Param("variantTypeId") int variantTypeId,
                        @Param("productId") int productId);

        @Query("select distinct vt from ProductVariant pv join pv.variantType vt where pv.product.id=:productId")
        List<VariantType> findVariantTypesByProductId(@Param("productId") int productId);

        @Query("select pv from ProductVariant pv where pv.variantType.id=:variantTypeId")
        List<ProductVariant> findByVariantTypeId(@Param("variantTypeId") int variantTypeId);

        @Query("select pv from ProductVariant pv where pv.variant.id=:variantId")
        List<ProductVariant> findByVariantId(@Param("variantId") int variantId);

        @Query("select pv from ProductVariant pv where pv.product.id=:productId and pv.variantType.id=:variantTypeId and pv.variant.id=:variantId")
        List<ProductVariant> findByProductId_VariantTypeId_VariantId(
                        @Param("productId") int productId,
                        @Param("variantTypeId") int variantTypeId,
                        @Param("variantId") int variantId);

        @Query("select pv from ProductVariant pv where pv.product.id=:productId and LOWER(pv.variant.value)=LOWER(:variantValue)")
        List<ProductVariant> findByProductId_VariantValue(
                        @Param("productId") Integer productId,
                        @Param("variantValue") String variantValue);
}
