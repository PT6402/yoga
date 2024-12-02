package app.yoga_server.service.category_service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import app.yoga_server.entities.Category;
import app.yoga_server.payload.CategoryPayload;
import app.yoga_server.repository.CategoryRepo;
import app.yoga_server.repository.product.ProductRepo;
import app.yoga_server.repository.product.ProductVariantRepo;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryImpl implements ICategory {
  private final CategoryRepo categoryRepo;
  private final ProductRepo productRepo;
  private final ProductVariantRepo productVariantRepo;
  @Value("${upload.path}")
  private String fileUpload;

  @Override
  public ResultUtil<?> getAllForAdmin() {

    try {
      var list = categoryRepo.findAll().stream().map(c -> {
        Map<String, Object> categoryMap = new HashMap<>();
        categoryMap.put("id", c.getId());
        categoryMap.put("name", c.getName());
        categoryMap.put("referenceProduct", c.getProducts().size());
        categoryMap.put("image", c.getImage());
        return categoryMap;
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
  public ResultUtil<?> getAllForUser() {
    try {
      var list = categoryRepo.findAllForUser().stream().map(c -> {
        Map<String, Object> categoryMap = new HashMap<>();
        categoryMap.put("id", c.getId());
        categoryMap.put("name", c.getName());
        categoryMap.put("image", c.getImage());
        return categoryMap;
      }).toArray();
      Map<String, Object> result = new HashMap<>();
      result.put("categorys", list);
      var listBrand = productRepo.findAllByStatus().stream().map(x -> x.getBrand()).distinct().toArray();
      result.put("brands", listBrand);
      var listPrice = productRepo.findAllByStatus().stream().map(x -> handleMaxPrice(x.getId(), x.getPrice_base()))
          .mapToInt(Integer::intValue).toArray();
      if (listPrice.length > 0) {
        int maxPrice = Arrays.stream(listPrice).max().getAsInt();
        int minPrice = Arrays.stream(listPrice).min().getAsInt();
        int[] resultPrice = { minPrice, maxPrice };
        result.put("price", resultPrice);
      }

      return ResultUtil.builder()
          .message("get all success")
          .status(true)
          .model(
              result)
          .build();
    } catch (Exception e) {
      return ResultUtil.builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Category> getOne(int id) {
    try {
      var result = categoryRepo.findById(id).orElseThrow(() -> new Exception("category not found by Id"));
      return ResultUtil.<Category>builder()
          .message("get one success")
          .status(true)
          .model(result)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Category>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Category> add(String name, MultipartFile file) {
    try {
      var checkExist = categoryRepo.findByName(name);
      if (!checkExist.get().isEmpty())
        throw new Exception("name category already!");

      if (file == null) {
        throw new Exception("category must a image");
      }
      String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
      log.info("file name image: " + fileName);
      FileCopyUtils.copy(file.getBytes(), new File(fileUpload + "/" +
          fileName.replace(" ", "_")));
      var categorySaved = categoryRepo.save(Category.builder()
          .name(name)
          .image(fileName.replace(" ", "_"))
          .build());
      return ResultUtil.<Category>builder()
          .message("add success")
          .status(true)
          .model(categorySaved)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Category>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Category> update(int id, CategoryPayload request) {
    try {
      var result = categoryRepo.findById(id).orElseThrow(() -> new Exception("not found category by id"));
      var checkExist = categoryRepo.findByName(request.getName());
      if (!checkExist.get().isEmpty() && !result.getName().equals(request.getName()))
        throw new Exception("name category already!");
      if (request.getFile() != null) {
        if (result.getImage() != null) {
          Path oldFilePath = Paths.get(fileUpload + "/" + result.getImage());
          try {
            Files.deleteIfExists(oldFilePath);
          } catch (IOException e) {
            e.printStackTrace();
          }
        }
        String fileName = System.currentTimeMillis() + "_" +
            request.getFile().getOriginalFilename();
        FileCopyUtils.copy(request.getFile().getBytes(), new File(fileUpload + "/" +
            fileName.replace(" ", "_")));
        result.setImage(fileName.replace(" ", "_"));
      }
      result.setName(request.getName());
      var categorySaved = categoryRepo.save(result);
      return ResultUtil.<Category>builder()
          .message("update success")
          .status(true)
          .model(categorySaved)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Category>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public ResultUtil<Category> remove(int id) {
    try {
      var result = categoryRepo.findById(id).orElseThrow(() -> new Exception("not found category by id"));
      if (result.getImage() != null) {
        Path oldFilePath = Paths.get(fileUpload + "/" + result.getImage());
        try {
          Files.deleteIfExists(oldFilePath);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      categoryRepo.deleteById(id);
      return ResultUtil.<Category>builder()
          .message("remove success")
          .status(true)
          .model(result)
          .build();
    } catch (Exception e) {
      return ResultUtil.<Category>builder()
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
}
