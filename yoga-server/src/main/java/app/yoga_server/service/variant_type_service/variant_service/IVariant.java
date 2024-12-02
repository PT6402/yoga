package app.yoga_server.service.variant_type_service.variant_service;

import java.util.List;

import app.yoga_server.entities.variant.Variant;
import app.yoga_server.utils.ResultUtil;

public interface IVariant {
  ResultUtil<List<Variant>> getAll();

  ResultUtil<List<Variant>> getAllByVariantTypeId(int variantTypeId);

  ResultUtil<Variant> getOne(int id);

  ResultUtil<Variant> add(int variantTypeId, String valueVariant);

  ResultUtil<Variant> add(int variantTypeId, String[] valueVariants);

  ResultUtil<Variant> updateValueVariant(int id, String valueVariant);

  ResultUtil<Variant> remove(int id);

  boolean removeAllByVariantType(int variantTypeId);

}
