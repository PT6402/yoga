package app.yoga_server.service.product_service.product_user;

import app.yoga_server.payload.product.ProductFilterPayload;
import app.yoga_server.utils.ResultUtil;

public interface IProductUser {
  ResultUtil<?> getAllProduct(int page);

  ResultUtil<?> getAllProductByNewArrival();

  ResultUtil<?> searchProduct(String search);

  ResultUtil<?> getOne(int id);

  ResultUtil<?> filterProduct(ProductFilterPayload payload, int page);

}
