package app.yoga_server.service.product_service;

import java.util.List;

import app.yoga_server.entities.product.Product;
import app.yoga_server.payload.product.ProductCreatePayload;
import app.yoga_server.payload.product.ProductInfo;
import app.yoga_server.payload.product.ProductVariantPayload;
import app.yoga_server.utils.ResultUtil;

public interface IProduct {
  ResultUtil<?> getAll();

  ResultUtil<?> getOne(int id);

  ResultUtil<?> addFirst(ProductCreatePayload payload);

  ResultUtil<?> addProductVariant(int productId, ProductVariantPayload payload);

  ResultUtil<?> updateInfo(int productId, ProductInfo payload);

  ResultUtil<?> remove(int productId);

  ResultUtil<?> removeProductVariantType(int productId, int variantTypeId);

  ResultUtil<?> removeProductVariant(int productVariantId);

  ResultUtil<?> checkExistProductInfo(int categoryId, String productName, String productBrand);

  ResultUtil<?> updateStatus(int productId);

  ResultUtil<?> updateDescription(int productId, String description);
}
