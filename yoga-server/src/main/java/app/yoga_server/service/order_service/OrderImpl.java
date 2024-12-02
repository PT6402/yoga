package app.yoga_server.service.order_service;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import app.yoga_server.entities.order.Order;
import app.yoga_server.entities.order.OrderItem;
import app.yoga_server.payload.order.OrderItemPayload;
import app.yoga_server.payload.order.OrderPayload;
import app.yoga_server.repository.InfoAppRepo;
import app.yoga_server.repository.order.OrderItemRepo;
import app.yoga_server.repository.order.OrderRepo;
import app.yoga_server.repository.product.ProductRepo;
import app.yoga_server.repository.product.ProductVariantRepo;
import app.yoga_server.service.mail_service.IMail;
import app.yoga_server.utils.ResultUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderImpl implements IOrder {
  private final OrderRepo orderRepo;
  private final OrderItemRepo orderItemRepo;
  private final ProductRepo productRepo;
  private final ProductVariantRepo productVariantRepo;
  private final SimpMessagingTemplate messagingTemplate;
  private final IMail mailService;
  private final InfoAppRepo infoAppService;

  @Value("${spring.mail.username}")
  private String formEmail;

  @Override
  public ResultUtil<?> getAllOrder() {
    try {
      var list = orderRepo.findAll().stream()
          .sorted(Comparator.comparing(Order::getCreateAt).reversed()).map(o -> {
            Map<String, Object> orderMap = new HashMap<>();
            orderMap.put("id", o.getId());
            orderMap.put("phone", o.getPhone());
            orderMap.put("fullname", o.getFullname());
            orderMap.put("totalPrice", o.getTotalPrice());
            orderMap.put("readStatus", o.getReadStatus());
            orderMap.put("confirmStatus", o.getConfirmStatus());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
            orderMap.put("time", o.getCreateAt().format(formatter));
            return orderMap;
          }).toArray();

      return ResultUtil.builder().model(list).status(true).message("get all success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> getOneOrder(int orderId) {
    try {
      var order = orderRepo.findById(orderId).orElseThrow(() -> new Exception("order not found by id"));
      var item = order.getOrders().stream().map(i -> {
        var checkPro = productRepo.findById(i.getProductId()).orElse(null);
        List<String> errorMissing = new ArrayList<>();
        Map<String, Object> itemMap = new HashMap<>();
        itemMap.put("id", i.getId());
        itemMap.put("quantity", i.getQuantity());
        itemMap.put("price", i.getPrice());
        itemMap.put("name", i.getProductName());
        itemMap.put("image", i.getProductImage());
        itemMap.put("variants", i.getVariants());
        itemMap.put("productId", i.getProductId());
        if (checkPro != null) {
          var checkType = productVariantRepo.findVariantTypesByProductId(checkPro.getId());
          if (!checkPro.getStatus())
            errorMissing.add("product status hidden");
          if (checkType.size() != i.getVariants().length) {
            errorMissing.add("variant type");
          } else {
            for (int ic = 0; ic < i.getVariants().length; ic++) {
              var checkInclude = productVariantRepo.findByProductId_VariantValue(checkPro.getId(), i.getVariants()[ic]);
              if (checkInclude.isEmpty()) {
                errorMissing.add("variant item" + "-" + i.getVariants()[ic]);
              }
              try {
                if (!checkInclude.get(0).getPrice_modifier().equals(i.getPriceVariants()[ic])) {
                  errorMissing.add("price variant item" + "-" + i.getVariants()[ic]);
                }
              } catch (Exception e) {
                break;
              }
            }
          }
          if (!checkPro.getPrice_base().equals(i.getPriceBaseProduct()))
            errorMissing.add("price base product");
        } else {
          errorMissing.add("product not found");
        }
        itemMap.put("errors", errorMissing);
        return itemMap;
      }).toArray();
      Map<String, Object> orderMap = new HashMap<>();
      orderMap.put("info", order);
      orderMap.put("item", item);

      return ResultUtil.builder().model(orderMap).status(true).message("get order success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> addOrder(OrderPayload payload) {
    try {
      if (payload.getItemCart().isEmpty())
        throw new Exception("cart empty");
      var orderSaved = orderRepo.save(Order.builder()
          .fullname(payload.getFullname())
          .email(payload.getEmail())
          .phone(payload.getPhone())
          .address(payload.getAddress())
          .message(payload.getMessage())
          .readStatus(false)
          .confirmStatus(false)
          .build());
      double totalPrice = 0;
      List<OrderItem> orderItems = new ArrayList<>();
      for (OrderItemPayload item : payload.getItemCart()) {
        var product = productRepo.findById(item.getProductId());
        if (product.isEmpty()) {
          break;
        }
        Double[] priceVariants = new Double[item.getVariants().length];
        for (int i = 0; i < item.getVariants().length; i++) {
          var getItemVariant = productVariantRepo.findByProductId_VariantValue(product.get().getId(),
              item.getVariants()[i]);
          priceVariants[i] = getItemVariant.get(0).getPrice_modifier();
        }
        totalPrice = totalPrice + item.getPrice() * item.getQuantity();
        orderItems.add(OrderItem.builder()
            .order(orderSaved)
            .priceVariants(priceVariants)
            .variants(item.getVariants())
            .price(item.getPrice())
            .quantity(item.getQuantity())
            .productName(product.get().getName())
            .productId(product.get().getId())
            .productImage(product.get().getProductImages().get(0).getImagePath())
            .priceBaseProduct(product.get().getPrice_base())
            .build());
      }
      orderSaved.setTotalPrice(totalPrice);
      var orderItemsSaved = orderItemRepo.saveAll(orderItems);
      orderRepo.save(orderSaved);
      orderSaved.setOrders(orderItemsSaved);
      sendMailToAdmin(orderSaved);
      messagingTemplate.convertAndSend("/queue", "update");
      return ResultUtil.builder().status(true).message("add success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> removeOrder(int orderId) {
    try {
      var order = orderRepo.findById(orderId).orElseThrow(() -> new Exception("order not found by id"));
      if (!order.getOrders().isEmpty()) {
        orderItemRepo.deleteAll(order.getOrders());
      }
      orderRepo.deleteById(orderId);
      return ResultUtil.builder().status(true).message("remove success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> addOrderItem(int orderId, OrderItemPayload payload) {
    try {
      var product = productRepo.findById(payload.getProductId())
          .orElseThrow(() -> new Exception("product not found by id"));
      var order = orderRepo.findById(orderId)
          .orElseThrow(() -> new Exception("order not found by id"));
      OrderItem itemExistOrder = null;
      for (var item : order.getOrders()) {
        if (Arrays.equals(payload.getVariants(), item.getVariants())) {
          itemExistOrder = item;
        }
      }
      Double[] priceVariants = new Double[payload.getVariants().length];
      for (int i = 0; i < payload.getVariants().length; i++) {
        var getItemVariant = productVariantRepo.findByProductId_VariantValue(product.getId(),
            payload.getVariants()[i]);
        priceVariants[i] = getItemVariant.get(0).getPrice_modifier();
      }
      if (itemExistOrder != null) {
        itemExistOrder.setPrice(payload.getPrice());
        itemExistOrder.setPriceVariants(priceVariants);
        itemExistOrder.setQuantity(itemExistOrder.getQuantity() + payload.getQuantity());
        itemExistOrder.setProductName(product.getName());
        itemExistOrder.setProductImage(product.getProductImages().get(0).getImagePath());
        itemExistOrder.setPriceBaseProduct(product.getPrice_base());
        orderItemRepo.save(itemExistOrder);
      } else {
        var orderItemSaved = orderItemRepo.save(OrderItem.builder()
            .order(order)
            .priceVariants(priceVariants)
            .price(payload.getPrice())
            .variants(payload.getVariants())
            .quantity(payload.getQuantity())
            .productId(product.getId())
            .productName(product.getName())
            .productImage(product.getProductImages().get(0).getImagePath())
            .priceBaseProduct(product.getPrice_base())
            .build());
        order.getOrders().add(orderItemSaved);
      }
      double totalPrice = 0;
      for (var x : order.getOrders()) {
        totalPrice = x.getPrice() * x.getQuantity() + totalPrice;
      }
      order.setTotalPrice(totalPrice);
      orderRepo.save(order);
      return ResultUtil.builder().status(true).message("remove success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> updateOrderItem(int itemId, OrderItemPayload payload) {
    try {
      var product = productRepo.findById(payload.getProductId())
          .orElseThrow(() -> new Exception("product not found by id"));
      var itemOrder = orderItemRepo.findById(itemId).orElseThrow(() -> new Exception("item order not found"));
      var order = orderRepo.findById(itemOrder.getOrder().getId())
          .orElseThrow(() -> new Exception("order not found by id"));
      OrderItem itemExistOrder = null;
      for (var item : order.getOrders()) {
        if (Arrays.equals(payload.getVariants(), item.getVariants()) && !item.equals(itemOrder)) {
          itemExistOrder = item;
        }
      }
      Double[] priceVariants = new Double[payload.getVariants().length];
      for (int i = 0; i < payload.getVariants().length; i++) {
        var getItemVariant = productVariantRepo.findByProductId_VariantValue(payload.getProductId(),
            payload.getVariants()[i]);
        priceVariants[i] = getItemVariant.get(0).getPrice_modifier();
      }
      if (itemExistOrder != null) {
        itemExistOrder.setPrice(payload.getPrice());
        itemExistOrder.setPriceVariants(priceVariants);
        itemExistOrder.setQuantity(itemExistOrder.getQuantity() + payload.getQuantity());
        itemExistOrder.setProductName(product.getName());
        itemExistOrder.setProductImage(product.getProductImages().get(0).getImagePath());
        itemExistOrder.setPriceBaseProduct(product.getPrice_base());
        order.getOrders().remove(itemOrder);
        orderItemRepo.delete(itemOrder);
        orderItemRepo.save(itemExistOrder);
      } else {
        itemOrder.setPriceVariants(priceVariants);
        itemOrder.setQuantity(payload.getQuantity());
        itemOrder.setVariants(payload.getVariants());
        itemOrder.setPrice(payload.getPrice());
        itemOrder.setProductName(product.getName());
        itemOrder.setProductImage(product.getProductImages().get(0).getImagePath());
        itemOrder.setPriceBaseProduct(product.getPrice_base());
        orderItemRepo.save(itemOrder);
      }

      // change total price order
      double totalPrice = 0;
      for (var x : order.getOrders()) {
        totalPrice = x.getPrice() * x.getQuantity() + totalPrice;
      }
      order.setTotalPrice(totalPrice);
      orderRepo.save(order);
      return ResultUtil.builder().status(true).message("update success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> removeOrderItem(int itemId) {
    try {
      var itemOrder = orderItemRepo.findById(itemId).orElseThrow(() -> new Exception("item order not found"));
      var order = orderRepo.findById(itemOrder.getOrder().getId())
          .orElseThrow(() -> new Exception("order not found by id"));
      orderItemRepo.delete(itemOrder);
      // change total price order
      double totalPrice = 0;
      for (var x : order.getOrders()) {
        totalPrice = x.getPrice() * x.getQuantity() + totalPrice;
      }
      order.setTotalPrice(totalPrice);
      orderRepo.save(order);
      return ResultUtil.builder().status(true).message("remove success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> updateInfoOrder(int orderId, OrderPayload payload) {
    try {
      var order = orderRepo.findById(orderId).orElseThrow(() -> new Exception("order not found by id"));
      var orderToUpdate = Order.builder()
          .fullname(payload.getFullname())
          .email(payload.getEmail())
          .phone(payload.getPhone())
          .address(payload.getAddress())
          .message(payload.getMessage())
          .totalPrice(order.getTotalPrice())
          .build();
      orderToUpdate.setId(order.getId());
      orderRepo.save(orderToUpdate);
      return ResultUtil.builder().status(true).message("update info success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> confirmOrderToSendUser(int orderId) {
    try {
      var order = orderRepo.findById(orderId).orElseThrow(() -> new Exception("order not found by id"));
      order.setConfirmStatus(true);
      order.setReadStatus(true);
      orderRepo.save(order);
      sendMailToUser(order);
      return ResultUtil.builder().status(true).message("send for user success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  @Override
  public ResultUtil<?> readOrderStatus(int orderId) {
    try {
      var order = orderRepo.findById(orderId).orElseThrow(() -> new Exception("order not found by id"));
      order.setReadStatus(true);
      orderRepo.save(order);
      return ResultUtil.builder().status(true).message("send for user success").build();
    } catch (Exception e) {
      return ResultUtil.builder().status(false).message(e.getMessage()).build();
    }
  }

  private void sendMailToAdmin(Order order) {
    try {
      String bodySend = "<html>"
          + "<body>"
          + "<div style='line-height:0.5;'>"
          + "<p><strong>Order ID:</strong> " + order.getId() + "</p>"
          + "<p><strong>Fullname:</strong> " + order.getFullname()
          + "<p><strong>Phone:</strong> " + order.getPhone()
          + "<p><strong>Time:</strong> "
          + order.getCreateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "</p>"
          + "</div>"
          + "<table style=\"border-collapse: collapse;\">"
          + "<tr><th>Name</th><th>Qty</th><th>Variants</th><th>Total</th></tr>"
          + order.getOrders().stream()
              .map(o -> {
                StringBuffer variants = new StringBuffer();
                for (int i = 0; i < o.getVariants().length; i++) {
                  variants.append(o.getVariants()[i]);
                  if (i != o.getVariants().length - 1) {
                    variants.append(" | ");
                  }
                }

                String productName = o.getProductName();
                return "<tr style=\"border-top: 1px solid black; border-bottom: 1px solid black;\"><td style=\"border-left: 1px solid black; border-right: 1px solid black; padding: 8px;\">"
                    + productName
                    + "</td><td style=\"border-left: 1px solid black; border-right: 1px solid black; padding: 8px;\">"
                    + "x" + o.getQuantity()
                    + "</td><td style=\"border-left: 1px solid black; border-right: 1px solid black; padding: 8px;\">"
                    + variants.toString()
                    + "</td><td style=\"border-left: 1px solid black; border-right: 1px solid black; padding: 8px;\">"
                    + formatPrice(o.getPrice() * o.getQuantity()) + "</td></tr>";
              })
              .collect(Collectors.joining())
          + "</table>"
          + "<p><strong>Total order:</strong> " + formatPrice(order.getTotalPrice()) + "</p>"
          + "</body>"
          + "</html>";
      mailService.sendHtmlMail(formEmail, "new order by user", bodySend);
    } catch (Exception e) {
      log.info(e.getMessage());
    }
  }

  private void sendMailToUser(Order order) {

    try {
      var dataBank = infoAppService.findFirst().get();
      String bank = "";
      if (dataBank != null) {
        bank = "<div style='line-height:0.5;border:1px solid black;border-style:dashed;padding:10px;color:black'>"
            + "<h3><strong>Thông tin chuyển khoản</strong></h3>"
            + "<p><strong>STK:</strong> " + dataBank.getBankStk() + "</p>"
            + "<p><strong>Ngân hàng:</strong> " + dataBank.getBankName() + "</p>"
            + "<p><strong>Tên TK:</strong> " + dataBank.getBankOwnerName() + "</p>"
            + "<p><strong>SĐT:</strong> " + dataBank.getPhone() + "</p>"
            + "</div>";
      }

      String bodySend = "<html>"
          + "<body style='background-color:white'>"
          + bank
          + "<div style='border:1px solid black;border-style:dashed;padding:10px;margin-top:5px;color:black'>"
          + "<div style='line-height:1'>"
          + "<p><strong>Order ID:</strong> " + order.getId() + "</p>"
          + "<p><strong>Fullname:</strong> " + order.getFullname() + "</p>"
          + "<p><strong>Phone:</strong> " + order.getPhone() + "</p>"
          + "<p><strong>Address:</strong> " + order.getAddress() + "</p>"
          + "</div>"
          + "<table style=\"border-collapse: collapse;\">"
          + "<tr><th>Name</th><th>Qty</th><th>Variants</th><th>Total</th></tr>"
          + order.getOrders().stream()
              .map(o -> {
                StringBuffer variants = new StringBuffer();
                for (int i = 0; i < o.getVariants().length; i++) {
                  variants.append(o.getVariants()[i]);
                  if (i != o.getVariants().length - 1) {
                    variants.append(" | ");
                  }
                }

                String productName = o.getProductName();
                return "<tr style=\"border-top: 1px solid black; border-bottom: 1px solid black;\"><td style=\"border-left: 1px solid black; border-right: 1px solid black; padding: 8px;\">"
                    + productName
                    + "</td><td style=\"border-left: 1px solid black; border-right: 1px solid black; padding: 8px;\">"
                    + "x" + o.getQuantity()
                    + "</td><td style=\"border-left: 1px solid black; border-right: 1px solid black; padding: 8px;\">"
                    + variants.toString()
                    + "</td><td style=\"border-left: 1px solid black; border-right: 1px solid black; padding: 8px;\">"
                    + formatPrice(o.getPrice() * o.getQuantity()) + "</td></tr>";
              })
              .collect(Collectors.joining())
          + "</table>"
          + "<p><strong>Total order:</strong> " + formatPrice(order.getTotalPrice()) + "</p>"
          + "</div>"
          + "</body>"
          + "</html>";
      mailService.sendHtmlMail(order.getEmail(), "Your order was confirmed", bodySend);
    } catch (Exception e) {
      log.info(e.getMessage());
    }
  }

  private String formatPrice(double price) {
    DecimalFormat formatter = new DecimalFormat("#,###");
    String formattedPrice = formatter.format(price);
    return formattedPrice;
  }

}
