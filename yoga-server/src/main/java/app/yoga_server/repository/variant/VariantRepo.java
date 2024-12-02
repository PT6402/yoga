package app.yoga_server.repository.variant;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import app.yoga_server.entities.variant.Variant;
import jakarta.transaction.Transactional;

@Repository
public interface VariantRepo extends JpaRepository<Variant, Integer> {
  @Query("select v from Variant v where v.value=:variantValue and v.variantType.id=:variantTypeId")
  Optional<Variant> findByValue(@Param("variantValue") String variantValue, @Param("variantTypeId") int variantTypeId);

  @Query("select v from Variant v where v.variantType.id=:variantTypeId")
  List<Variant> findAllByVariantTypeId(@Param("variantTypeId") int variantTypeId);

  @Modifying
  @Transactional
  @Query("delete from Variant v where v.variantType.id =:variantTypeId")
  void removeAllByVariantType(@Param("variantTypeId") int variantTypeId);
}
