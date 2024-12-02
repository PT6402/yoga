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

import app.yoga_server.payload.VariantPayload;
import app.yoga_server.service.variant_type_service.VariantTypeImpl;
import app.yoga_server.service.variant_type_service.variant_service.VariantImpl;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/variant/admin")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class VariantController {
  private final VariantTypeImpl variantTypeService;
  private final VariantImpl variantService;

  @GetMapping
  public ResponseEntity<?> getAll() {
    var result = variantTypeService.getAll();
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/type/{id}")
  public ResponseEntity<?> getOne(@PathVariable("id") int variantTypeId) {
    var result = variantTypeService.getOne(variantTypeId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping
  public ResponseEntity<?> add(@ModelAttribute VariantPayload payload) {
    var result = variantTypeService.add(payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/type/{id}")
  public ResponseEntity<?> addVariant(
      @PathVariable("id") int variantTypeId,
      @RequestParam String valueVariant) {
    var result = variantService.add(variantTypeId, valueVariant);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/type/{id}")
  public ResponseEntity<?> updateVariantType(
      @PathVariable("id") int variantTypeId,
      @PathParam("variantTypeName") String variantTypeName) {
    var result = variantTypeService.update(variantTypeId, variantTypeName);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("{id}")
  public ResponseEntity<?> updateVariant(
      @PathVariable("id") int variantId,
      @PathParam("variantValue") String variantValue) {
    var result = variantService.updateValueVariant(variantId, variantValue);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("/type/{id}")
  public ResponseEntity<?> deleteVariantType(@PathVariable("id") int variantTypeId) {
    var result = variantTypeService.remove(variantTypeId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deleteVariant(@PathVariable("id") int variantId) {
    var result = variantService.remove(variantId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

}
