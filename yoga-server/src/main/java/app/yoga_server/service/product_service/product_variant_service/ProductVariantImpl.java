package app.yoga_server.service.product_service.product_variant_service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import app.yoga_server.entities.product.ProductVariant;
import app.yoga_server.payload.product.ProductVariantPayload;
import app.yoga_server.repository.product.ProductRepo;
import app.yoga_server.repository.product.ProductVariantRepo;
import app.yoga_server.repository.variant.VariantRepo;
import app.yoga_server.repository.variant.VariantTypeRepo;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductVariantImpl implements IProductVariant {
  private final ProductRepo productRepo;
  private final ProductVariantRepo productVariantRepo;
  private final VariantTypeRepo variantTypeRepo;
  private final VariantRepo variantRepo;

  @Override
  public ResultUtil<List<ProductVariant>> getAllByProductId(int productId) {
    try {
      productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      var list = productVariantRepo.findByProductId(productId).get();
      return ResultUtil.<List<ProductVariant>>builder()
          .message("get all by product_id success")
          .status(true)
          .model(list).build();
    } catch (Exception e) {
      return ResultUtil.<List<ProductVariant>>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<List<ProductVariant>> getAllByVariantTypeIdAndProductId(int variantTypeId, int productId) {
    try {
      variantTypeRepo.findById(variantTypeId).orElseThrow(() -> new Exception("variant type not found by id"));
      productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      var list = productVariantRepo.findProductVariantByVariantTypeAndProductId(variantTypeId, productId).get();
      return ResultUtil.<List<ProductVariant>>builder()
          .message("get all by variant_type_id and product_id success")
          .status(true)
          .model(list).build();
    } catch (Exception e) {
      return ResultUtil.<List<ProductVariant>>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public boolean addProductVariants(int productId, List<ProductVariantPayload> payload) {
    try {
      var product = productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      List<ProductVariant> listSave = new ArrayList<>();
      for (int i = 0; i < payload.size(); i++) {
        var variantType = variantTypeRepo.findById(payload.get(i).getVariantTypeId()).orElse(null);
        var variant = variantRepo.findById(payload.get(i).getVariantId()).orElse(null);
        if (variantType == null || variant == null)
          break;
        listSave.add(ProductVariant.builder()
            .product(product)
            .variantType(variantType)
            .variant(variant)
            .price_modifier(payload.get(i).getPrice_modifier())
            .build());
      }

      if (listSave.isEmpty())
        throw new Exception("save faild");

      productVariantRepo.saveAll(listSave);
      return true;

    } catch (Exception e) {
      log.error("error addProductVariants: {}", e.getMessage());
      return false;
    }
  }

  @Override
  public boolean addProductVariant(int productId, ProductVariantPayload payload) {
    try {
      var product = productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      var variantType = variantTypeRepo.findById(payload.getVariantTypeId()).orElse(null);
      var variant = variantRepo.findById(payload.getVariantId()).orElse(null);
      if (variantType == null || variant == null)
        throw new Exception("variant type or variant is null");

      var checkExist = productVariantRepo.findByProductId_VariantTypeId_VariantId(productId, variantType.getId(),
          variant.getId());
      if (!checkExist.isEmpty()) {
        throw new Exception("product variant already");
      }
      var productVariant = ProductVariant.builder()
          .product(product)
          .variantType(variantType)
          .variant(variant)
          .price_modifier(payload.getPrice_modifier())
          .build();

      productVariantRepo.save(productVariant);
      return true;

    } catch (Exception e) {
      log.error("error addProductVariant: {}", e.getMessage());
      return false;
    }
  }

  @Override
  public boolean removeByProductId(int productId) {
    try {
      productVariantRepo.removeProductVariantByProductId(productId);
      return true;
    } catch (Exception e) {
      log.error("error removeProductVariantByProductId: {}", e.getMessage());
      return false;
    }
  }

  @Override
  public boolean removeByVariantTypeAndProductId(int variantTypeId, int productId) {
    try {
      productVariantRepo.removeProductVariantByVariantTypeAndProductId(variantTypeId, productId);
      return true;
    } catch (Exception e) {
      log.error("error removeProductVariantByProductId: {}", e.getMessage());
      return false;
    }
  }

}
