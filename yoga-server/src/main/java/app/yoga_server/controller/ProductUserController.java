package app.yoga_server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.yoga_server.payload.product.ProductFilterPayload;
import app.yoga_server.service.product_service.product_user.IProductUser;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductUserController {
  private final IProductUser productService;

  @GetMapping("/page/{page}")
  public ResponseEntity<?> getAll(@PathVariable int page) {
    var result = productService.getAllProduct(page);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getOne(@PathVariable int id) {
    var result = productService.getOne(id);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/search/{search}")
  public ResponseEntity<?> getAllSearch(@PathVariable String search) {
    var result = productService.searchProduct(search);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/filter/{page}")
  public ResponseEntity<?> filterProduct(@PathVariable int page, @RequestBody ProductFilterPayload payload) {
    var result = productService.filterProduct(payload, page);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/new-arrival")
  public ResponseEntity<?> getAllProductNewarrival() {
    var result = productService.getAllProductByNewArrival();
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }
}
