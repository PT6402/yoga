package app.yoga_server.service.category_service;

import org.springframework.web.multipart.MultipartFile;

import app.yoga_server.entities.Category;
import app.yoga_server.payload.CategoryPayload;
import app.yoga_server.utils.ResultUtil;

public interface ICategory {
  ResultUtil<?> getAllForUser();

  ResultUtil<?> getAllForAdmin();

  ResultUtil<Category> getOne(int id);

  ResultUtil<Category> add(String name, MultipartFile file);

  ResultUtil<Category> update(int id, CategoryPayload request);

  ResultUtil<Category> remove(int id);

}
