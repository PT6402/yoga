package app.yoga_server.service.order_service;

import app.yoga_server.payload.order.OrderItemPayload;
import app.yoga_server.payload.order.OrderPayload;
import app.yoga_server.utils.ResultUtil;

public interface IOrder {
  ResultUtil<?> getAllOrder();

  ResultUtil<?> addOrder(OrderPayload payload);

  ResultUtil<?> removeOrder(int orderId);

  ResultUtil<?> getOneOrder(int orderId);

  ResultUtil<?> confirmOrderToSendUser(int orderId);

  ResultUtil<?> readOrderStatus(int orderId);

  // item
  ResultUtil<?> addOrderItem(int orderId, OrderItemPayload payload);

  ResultUtil<?> updateOrderItem(int itemId, OrderItemPayload payload);

  ResultUtil<?> removeOrderItem(int itemId);

  // infor
  ResultUtil<?> updateInfoOrder(int orderId, OrderPayload payload);
}
