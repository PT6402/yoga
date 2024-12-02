package app.yoga_server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.yoga_server.payload.order.OrderItemPayload;
import app.yoga_server.payload.order.OrderPayload;
import app.yoga_server.service.order_service.IOrder;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

  private final IOrder orderService;

  @GetMapping("/admin")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> getAll() {
    var result = orderService.getAllOrder();
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/admin/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> getOne(@PathVariable int id) {
    var result = orderService.getOneOrder(id);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping
  public ResponseEntity<?> addOrder(@RequestBody OrderPayload payload) {
    var result = orderService.addOrder(payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("/admin/{idOrder}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> removeOrder(@PathVariable int idOrder) {
    var result = orderService.removeOrder(idOrder);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/admin/item/{orderId}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> addOrderItem(@PathVariable int orderId, @RequestBody OrderItemPayload payload) {
    var result = orderService.addOrderItem(orderId, payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/admin/item/{itemId}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> updateOrderItem(@PathVariable int itemId, @RequestBody OrderItemPayload payload) {
    var result = orderService.updateOrderItem(itemId, payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @DeleteMapping("/admin/item/{itemId}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> removeOrderItem(@PathVariable int itemId) {
    var result = orderService.removeOrderItem(itemId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/admin/info/{orderId}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> updateInfoOrder(@PathVariable int orderId, @RequestBody OrderPayload payload) {
    var result = orderService.updateInfoOrder(orderId, payload);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/admin/read/{orderId}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> updateReadStatus(@PathVariable int orderId) {
    var result = orderService.readOrderStatus(orderId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }

  @PutMapping("/admin/confirm/{orderId}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> updateConfirmStatus(@PathVariable int orderId) {
    var result = orderService.confirmOrderToSendUser(orderId);
    return new ResponseEntity<>(result, result.getStatus() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
  }
}
