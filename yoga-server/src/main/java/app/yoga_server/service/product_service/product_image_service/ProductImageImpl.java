package app.yoga_server.service.product_service.product_image_service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import app.yoga_server.entities.product.Product;
import app.yoga_server.entities.product.ProductImage;
import app.yoga_server.repository.product.ProductImageRepo;
import app.yoga_server.repository.product.ProductRepo;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductImageImpl implements IProductImage {
  private final ProductImageRepo productImageRepo;
  private final ProductRepo productRepo;

  @Value("${upload.path}")
  private String fileUpload;

  @Override
  public ResultUtil<List<ProductImage>> getAllByProductId(int productId) {
    try {
      var list = productImageRepo.findAllByProductId(productId);

      return ResultUtil.<List<ProductImage>>builder()
          .message("get success")
          .status(true)
          .model(list)
          .build();
    } catch (Exception e) {
      return ResultUtil.<List<ProductImage>>builder()
          .message(e.getMessage())
          .status(false)
          .build();
    }
  }

  @Override
  public boolean addFirst(int productId, MultipartFile[] files) {
    try {
      Product product = productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      if (files.length > 0) {
        List<ProductImage> productImages = new ArrayList<>();
        for (int i = 0; i < files.length; i++) {
          String fileName = System.currentTimeMillis() + "_" + files[i].getOriginalFilename();
          log.info(fileName);
          FileCopyUtils.copy(files[i].getBytes(), new File(fileUpload + "/" +
              fileName.replace(" ", "_")));
          productImages.add(ProductImage.builder()
              .imagePath(fileName.replace(" ",
                  "_"))
              .product(product)
              .build());
        }
        productImageRepo.saveAll(productImages);
        return true;
      }
      return false;
    } catch (Exception e) {
      log.error(e.getMessage());
      return false;
    }
  }

  @Override
  public ResultUtil<?> add(int productId, MultipartFile file) {
    try {
      Product product = productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      if (file != null) {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        FileCopyUtils.copy(file.getBytes(), new File(fileUpload + "/" + fileName.replace(" ", "_")));
        productImageRepo.save(ProductImage.builder()
            .imagePath(fileName.replace(" ",
                "_"))
            .product(product)
            .build());

        return ResultUtil.builder().message("add success").status(true).build();
      }
      throw new Exception("add fail!");
    } catch (Exception e) {
      return ResultUtil.builder().message(e.getMessage()).status(false).build();
    }
  }

  @Override
  public ResultUtil<?> remove(int productImageId) {
    try {
      var productImage = productImageRepo.findById(productImageId)
          .orElseThrow(() -> new Exception("product image not found by id"));
      if (productImage.getImagePath() != null) {
        Path oldFilePath = Paths.get(fileUpload + "/" + productImage.getImagePath());
        try {
          Files.deleteIfExists(oldFilePath);
        } catch (IOException e) {
          log.error(e.getMessage());
          e.printStackTrace();
        }
      }
      productImageRepo.deleteById(productImageId);
      return ResultUtil.builder().message("remove success").status(true).build();
    } catch (Exception e) {
      return ResultUtil.builder().message(e.getMessage()).status(false).build();
    }
  }

  @Override
  public boolean removeAllByProductId(int productId) {
    try {
      productRepo.findById(productId).orElseThrow(() -> new Exception("product not found by id"));
      var listProductImage = productImageRepo.findAllByProductId(productId);
      for (ProductImage pi : listProductImage) {
        if (pi.getImagePath() != null) {
          log.info("checked");
          Path oldFilePath = Paths.get(fileUpload + "/" + pi.getImagePath());
          try {
            Files.deleteIfExists(oldFilePath);
          } catch (IOException e) {
            log.error(e.getMessage());
            e.printStackTrace();
          }
        }
      }

      productImageRepo.removeByProductId(productId);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}
