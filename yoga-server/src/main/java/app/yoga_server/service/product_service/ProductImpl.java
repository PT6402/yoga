package app.yoga_server.service.product_service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import app.yoga_server.entities.Category;
import app.yoga_server.entities.product.Product;
import app.yoga_server.entities.product.ProductVariant;
import app.yoga_server.payload.product.ProductCreatePayload;
import app.yoga_server.payload.product.ProductInfo;
import app.yoga_server.payload.product.ProductVariantPayload;
import app.yoga_server.repository.CategoryRepo;
import app.yoga_server.repository.product.ProductRepo;
import app.yoga_server.repository.product.ProductVariantRepo;
import app.yoga_server.service.product_service.product_image_service.IProductImage;
import app.yoga_server.service.product_service.product_variant_service.IProductVariant;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductImpl implements IProduct {
  private final CategoryRepo categoryRepo;
  private final ProductRepo productRepo;
  private final ProductVariantRepo productVariantRepo;
  private final IProductVariant productVariantService;
  private final IProductImage productImageService;

  @Override
  public ResultUtil<?> getAll() {
    try {
      var list = productRepo.findAll()
          .stream().map((x) -> {
            Map<String, Object> productMap = new HashMap<>();
            productMap.put("id", x.getId());
            productMap.put("name", x.getName());
            productMap.put("brand", x.getBrand());
            productMap.put("status", x.getStatus());
            productMap.put("image", x.getProductImages().get(0).getImagePath());
            int minPrice = handleMinPrice(x.getId(), x.getPrice_base());
            int maxPrice = handleMaxPrice(x.getId(), x.getPrice_base());
            if (minPrice == maxPrice) {
              productMap.put("price", minPrice);
            } else {
              productMap.put("price", minPrice + "-" + maxPrice);
            }
            return productMap;
          }).toArray();
      return ResultUtil.builder()
          .message("get all success")
          .status(true)
          .model(list)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> getOne(int id) {
    try {
      var product = productRepo.findById(id).orElseThrow(() -> new Exception("product not found by id"));
      var listVariant = productVariantRepo.findVariantTypesByProductId(id).stream().map((x) -> {
        Map<String, Object> variantTypeMap = new HashMap<>();
        variantTypeMap.put("id", x.getId());
        variantTypeMap.put("name", x.getName());
        var productVariants = productVariantService.getAllByVariantTypeIdAndProductId(x.getId(), id).getModel().stream()
            .map((pv) -> {
              Map<String, Object> variantMap = new HashMap<>();
              variantMap.put("id", pv.getId());// id variant product
              variantMap.put("value", pv.getVariant().getValue());
              variantMap.put("price_modifier", pv.getPrice_modifier());
              return variantMap;
            }).toArray();
        variantTypeMap.put("variants", productVariants);

        return variantTypeMap;
      }).sorted((map1, map2) -> Integer.compare((Integer) map1.get("id"), (Integer) map2.get("id"))).toArray();
      var productImages = productImageService.getAllByProductId(id).getModel().stream()
          .map((pi) -> {
            Map<String, Object> imageMap = new HashMap<>();
            imageMap.put("id", pi.getId());
            imageMap.put("src", pi.getImagePath());
            return imageMap;
          }).toArray();

      Map<String, Object> productMap = new HashMap<>();
      productMap.put("product", product);
      productMap.put("product_variant", listVariant);
      productMap.put("product_image", productImages);

      return ResultUtil.builder()
          .message("get one success")
          .status(true)
          .model(productMap)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> addFirst(ProductCreatePayload payload) {
    try {
      var category = categoryRepo.findById(payload.getCategory_id())
          .orElseThrow(() -> new Exception("category not found by id"));

      if (!productRepo.findByCategoryIdAndNameAndBrand(category.getId(), payload.getName(), payload.getBrand())
          .isEmpty()) {
        throw new Exception("product exist!");
      }
      var product = Product.builder()
          .name(payload.getName())
          .status(false)
          .newArrival(true)
          .price_base(payload.getPrice_base())
          .description(payload.getDescription())
          .brand(payload.getBrand())
          .category(null).category(category).build();
      product = productRepo.save(product);
      if (payload.getProductVariants() != null && !payload.getProductVariants().isEmpty()) {
        boolean check = productVariantService.addProductVariants(product.getId(), payload.getProductVariants());
        if (!check)
          throw new Exception("add variant fail");
      }
      if (payload.getFiles().length > 0) {
        boolean checkImage = productImageService.addFirst(product.getId(), payload.getFiles());
        if (!checkImage)
          throw new Exception("add variant fail images");
      }
      return ResultUtil.builder()
          .message("add success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> addProductVariant(int productId, ProductVariantPayload payload) {
    try {
      var check = productVariantService.addProductVariant(productId, payload);
      if (!check)
        throw new Exception("add produt variant fail!");
      return ResultUtil.builder()
          .message("add success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> updateInfo(int productId, ProductInfo payload) {
    try {
      var product = productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      if (!product.getCategory().getId().equals(payload.getCategory_id())) {
        var category = categoryRepo.findById(payload.getCategory_id())
            .orElseThrow(() -> new Exception("caregory not found by id"));
        var checkCategory = productRepo.findByCategoryIdAndNameAndBrand(
            payload.getCategory_id(),
            payload.getName(),
            payload.getBrand());
        if (!checkCategory.isEmpty())
          throw new Exception("produt exist!");
        product.setCategory(category);
      }
      if (!product.getName().equals(payload.getName()) || !product.getBrand().equals(payload.getBrand())) {
        var checkCategory = productRepo.findByCategoryIdAndNameAndBrand(
            payload.getCategory_id(),
            payload.getName(),
            payload.getBrand());
        if (!checkCategory.isEmpty())
          throw new Exception("produt exist!");
        product.setName(payload.getName());
        product.setBrand(payload.getBrand());
      }

      product.setPrice_base(payload.getPrice_base());
      product.setNewArrival(payload.isNewArrival());
      productRepo.save(product);
      return ResultUtil.builder()
          .message("update info success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> remove(int productId) {
    try {
      productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      boolean check = productVariantService.removeByProductId(productId);
      boolean checkImage = productImageService.removeAllByProductId(productId);
      if (!check)
        throw new Exception("remove product variant fail");
      if (!checkImage)
        throw new Exception("remove product variant fail image");
      productRepo.deleteById(productId);
      return ResultUtil.builder()
          .message("remove success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> removeProductVariantType(int productId, int variantTypeId) {
    try {
      var check = productVariantService.removeByVariantTypeAndProductId(variantTypeId, productId);
      if (!check)
        throw new Exception("remove faild");
      return ResultUtil.builder()
          .message("remove success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> removeProductVariant(int productVariantId) {
    try {
      productVariantRepo.findById(productVariantId)
          .orElseThrow(() -> new Exception("product variant not found by id"));
      productVariantRepo.deleteById(productVariantId);
      return ResultUtil.builder()
          .message("remove single product variant success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> checkExistProductInfo(int categoryId, String productName, String productBrand) {
    try {
      var check = productRepo.findByCategoryIdAndNameAndBrand(categoryId, productName, productBrand);
      if (!check.isEmpty())
        throw new Exception("product info exist");
      return ResultUtil.builder()
          .message("product info no exist")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> updateStatus(int productId) {
    try {
      var result = productRepo.findById(productId).orElseThrow(() -> new Exception("not found product by id"));
      result.setStatus(!result.getStatus());
      productRepo.save(result);
      return ResultUtil.builder()
          .message("update status success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<?> updateDescription(int productId, String description) {
    try {
      var product = productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      product.setDescription(description);
      productRepo.save(product);
      return ResultUtil.builder()
          .message("update description success")
          .status(true)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  private int handleMaxPrice(int productId, double price_base) {
    var list = productVariantRepo.findVariantTypesByProductId(productId);
    double priceMax = price_base;
    for (int i = 0; i < list.size(); i++) {
      var price = productRepo.findHighestPriceModifierByProductIdAndTypeId(productId,
          list.get(i).getId());
      priceMax = price + priceMax;
    }
    return (int) priceMax;
  }

  private int handleMinPrice(int productId, double price_base) {
    var list = productVariantRepo.findVariantTypesByProductId(productId);
    double priceMin = price_base;
    for (int i = 0; i < list.size(); i++) {
      var price = productRepo.findLowestPriceModifierByProductIdAndTypeId(productId,
          list.get(i).getId());
      priceMin = price + priceMin;
    }
    return (int) priceMin;
  }

}
