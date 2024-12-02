package app.yoga_server.service.product_service.product_variant_service;

import java.util.List;

import app.yoga_server.entities.product.ProductVariant;
import app.yoga_server.payload.product.ProductVariantPayload;
import app.yoga_server.utils.ResultUtil;

public interface IProductVariant {
  ResultUtil<List<ProductVariant>> getAllByProductId(int productId);

  ResultUtil<List<ProductVariant>> getAllByVariantTypeIdAndProductId(int variantTypeId, int productId);

  boolean addProductVariants(int productId, List<ProductVariantPayload> payload);

  boolean addProductVariant(int productId, ProductVariantPayload payload);

  boolean removeByProductId(int productId);

  boolean removeByVariantTypeAndProductId(int variantTypeId, int productId);
}
