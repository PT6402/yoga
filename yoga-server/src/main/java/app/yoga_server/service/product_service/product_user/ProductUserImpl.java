package app.yoga_server.service.product_service.product_user;

import java.util.AbstractMap;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

import app.yoga_server.entities.product.Product;
import app.yoga_server.payload.product.ProductFilterPayload;
import app.yoga_server.repository.product.ProductRepo;
import app.yoga_server.repository.product.ProductVariantRepo;
import app.yoga_server.service.product_service.product_image_service.IProductImage;
import app.yoga_server.service.product_service.product_variant_service.IProductVariant;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductUserImpl implements IProductUser {
  private final ProductRepo productRepo;
  private final IProductImage imageService;
  private final IProductVariant variantService;
  private final ProductVariantRepo productVariantRepo;
  int pageSize = 2;

  @Override
  public ResultUtil<?> getAllProduct(int page) {
    try {
      int offset = (page - 1) * pageSize;
      var products = productRepo.findAllByStatus();
      var list = products.stream().skip(offset).limit(pageSize).map(p -> getProductItem(p)).toArray();
      int totalElements = products.size();
      int totalPage = (int) Math.ceil((double) totalElements / pageSize);
      Map<String, Object> result = new HashMap<>();
      result.put("data", list);
      result.put("totalPage", totalPage);
      return ResultUtil.builder().model(result).status(true).message("get product user success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> searchProduct(String search) {

    var result = productRepo.findAllBySearch(search).stream().map(x -> getProductItem(x)).toArray();
    try {
      return ResultUtil.builder().model(result).status(true).message("get product user success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> getOne(int id) {
    try {
      var product = productRepo.findByIdWithStatus(id).orElseThrow(() -> new Exception("product not found by id"));
      return ResultUtil.builder().model(getProductFull(product)).status(true).message("get product user success")
          .build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> filterProduct(ProductFilterPayload payload, int page) {
    try {
      if (payload.getBrand() == null && payload.getCategoryId() == null && payload.getPrice()[0] == null
          && payload.getPrice()[1] == null) {
        return ResultUtil.builder().status(true).message("not filter").build();
      }
      int offset = (page - 1) * pageSize;
      var list = productRepo.filterProducts(payload.getCategoryId(), payload.getBrand());
      var listFilter = list.stream()
          .map(product -> {
            int maxPrice = handleMaxPrice(product.getId(), product.getPrice_base());
            return new AbstractMap.SimpleEntry<>(product, maxPrice);
          })
          .filter(entry -> {
            int price = entry.getValue();
            return (payload.getPrice()[0] == null || price >= payload.getPrice()[0]) &&
                (payload.getPrice()[1] == null || price <= payload.getPrice()[1]);
          })
          .toList();

      var paginatedList = listFilter.stream()
          .skip(offset)
          .limit(pageSize)
          .map(Map.Entry::getKey)
          .map(this::getProductItem)
          .toArray();
      int totalElements = listFilter.size();
      int totalPage = (int) Math.ceil((double) totalElements / pageSize);
      Map<String, Object> result = new HashMap<>();
      result.put("data", paginatedList);
      result.put("totalPage", totalPage);
      return ResultUtil.builder().model(result).status(true).message("filter product user success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> getAllProductByNewArrival() {
    try {
      var list = productRepo.findAllByNewArrival().stream().map(x -> getProductItem(x)).toArray();
      return ResultUtil.builder().model(list).status(true).message("new arrival product user success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  private Map<String, Object> getProductItem(Product p) {
    Map<String, Object> productMap = new HashMap<>();
    productMap.put("id", p.getId());
    productMap.put("name", p.getName());
    productMap.put("brand", p.getBrand());
    productMap.put("price", handleMaxPrice(p.getId(), p.getPrice_base()));
    productMap.put("categoryId", p.getCategory().getId());
    var listImages = imageService.getAllByProductId(p.getId()).getModel();
    productMap.put("image", listImages.get(0).getImagePath());
    return productMap;
  }

  private Map<String, Object> getProductFull(Product p) {
    Map<String, Object> productMap = new HashMap<>();
    productMap.put("id", p.getId());
    productMap.put("name", p.getName());
    productMap.put("brand", p.getBrand());
    productMap.put("price_base", p.getPrice_base());
    productMap.put("description", p.getDescription());

    // category
    Map<String, Object> categoryMap = new HashMap<>();
    categoryMap.put("id", p.getCategory().getId());
    categoryMap.put("name", p.getCategory().getName());
    categoryMap.put("image", p.getCategory().getImage());
    productMap.put("category", categoryMap);

    // image
    Map<String, Object> imageMap = new HashMap<>();
    var listImages = imageService.getAllByProductId(p.getId()).getModel();
    imageMap.put("mainImage", listImages.get(0).getImagePath());
    var images = listImages.stream().map(m -> {
      return m.getImagePath();
    }).toArray();
    imageMap.put("images", images);
    productMap.put("image", imageMap);

    // variant
    var listVariant = productVariantRepo.findVariantTypesByProductId(p.getId()).stream().map((x) -> {
      Map<String, Object> variantTypeMap = new HashMap<>();
      variantTypeMap.put("id", x.getId());
      variantTypeMap.put("type", x.getName());
      var productVariants = variantService.getAllByVariantTypeIdAndProductId(x.getId(), p.getId()).getModel()
          .stream()
          .map((pv) -> {
            Map<String, Object> variantMap = new HashMap<>();
            variantMap.put("id", pv.getId());// id variant product
            variantMap.put("value", pv.getVariant().getValue());
            variantMap.put("price_modifier", pv.getPrice_modifier());
            return variantMap;
          }).toArray();
      variantTypeMap.put("item", productVariants);
      return variantTypeMap;
    }).sorted((map1, map2) -> Integer.compare((Integer) map1.get("id"), (Integer) map2.get("id"))).toArray();
    productMap.put("variants", listVariant);

    return productMap;
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

}
