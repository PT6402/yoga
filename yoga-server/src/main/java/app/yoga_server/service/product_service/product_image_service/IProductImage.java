package app.yoga_server.service.product_service.product_image_service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import app.yoga_server.entities.product.ProductImage;
import app.yoga_server.utils.ResultUtil;

public interface IProductImage {
  ResultUtil<List<ProductImage>> getAllByProductId(int productId);

  boolean addFirst(int productId, MultipartFile[] files);

  ResultUtil<?> add(int productId, MultipartFile file);

  ResultUtil<?> remove(int productImageId);

  boolean removeAllByProductId(int productId);
}
