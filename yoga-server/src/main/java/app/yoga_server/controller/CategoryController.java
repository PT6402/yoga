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

import app.yoga_server.payload.CategoryPayload;
import app.yoga_server.service.category_service.ICategory;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
  private final ICategory categoryService;

  @GetMapping
  public ResponseEntity<?> getAllForUser() {
    var result = categoryService.getAllForUser();
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/admin")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> getAllForAdmin() {
    var result = categoryService.getAllForAdmin();
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/admin/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> getOne(@PathVariable("id") int categoryId) {
    var result = categoryService.getOne(categoryId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/admin")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> add(@RequestParam String name, @RequestParam MultipartFile file) {
    var result = categoryService.add(name, file);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/admin/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> update(@PathVariable int id, @ModelAttribute CategoryPayload request) {
    var result = categoryService.update(id, request);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("/admin/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> remove(@PathVariable int id) {
    var result = categoryService.remove(id);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }
}
