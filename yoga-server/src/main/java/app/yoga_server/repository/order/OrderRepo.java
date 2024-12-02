package app.yoga_server.repository.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.yoga_server.entities.order.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {

}
