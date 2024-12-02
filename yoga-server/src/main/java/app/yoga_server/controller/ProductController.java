package app.yoga_server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import app.yoga_server.payload.product.ProductCreatePayload;
import app.yoga_server.payload.product.ProductInfo;
import app.yoga_server.payload.product.ProductVariantPayload;
import app.yoga_server.service.product_service.IProduct;
import app.yoga_server.service.product_service.product_image_service.IProductImage;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/product/admin")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class ProductController {
  private final IProduct productService;
  private final IProductImage productImage;

  @GetMapping
  public ResponseEntity<?> getAll() {
    var result = productService.getAll();
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getOne(@PathVariable int id) {
    var result = productService.getOne(id);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping
  public ResponseEntity<?> add(@ModelAttribute ProductCreatePayload payload) {
    var result = productService.addFirst(payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/{id}")
  public ResponseEntity<?> add(@PathVariable("id") int productId, @ModelAttribute ProductVariantPayload payload) {
    var result = productService.addProductVariant(productId, payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateInfo(@PathVariable("id") int productId, @ModelAttribute ProductInfo payload) {
    var result = productService.updateInfo(productId, payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> removeProduct(@PathVariable("id") int productId) {
    var result = productService.remove(productId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("/variant/{productVariantId}")
  public ResponseEntity<?> removeVariant(@PathVariable int productVariantId) {
    var result = productService.removeProductVariant(productVariantId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("/{productId}/type/{variantTypeId}")
  public ResponseEntity<?> removeVariantType(@PathVariable int productId, @PathVariable int variantTypeId) {
    var result = productService.removeProductVariantType(productId, variantTypeId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/check-product-info")
  public ResponseEntity<?> checkExist(
      @RequestParam int categoryId,
      @RequestParam String productName,
      @RequestParam String productBrand) {
    var result = productService.checkExistProductInfo(categoryId, productName, productBrand);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/{productId}/image")
  public ResponseEntity<?> addImage(@PathVariable int productId, @RequestParam MultipartFile file) {
    var result = productImage.add(productId, file);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("/image/{productImageId}")
  public ResponseEntity<?> removeImage(@PathVariable int productImageId) {
    var result = productImage.remove(productImageId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/status/{productId}")
  public ResponseEntity<?> updateStatus(@PathVariable int productId) {
    var result = productService.updateStatus(productId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/description/{productId}")
  public ResponseEntity<?> updateDescription(@PathVariable int productId, @RequestParam String description) {
    var result = productService.updateDescription(productId, description);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

}
