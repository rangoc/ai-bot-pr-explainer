class OrderTracking {
  constructor() {
    this.orders = [];
  }

  updateStatus(orderId, status) {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
    } else {
      this.orders.push({ id: orderId, status });
    }
  }

  getStatus(orderId) {
    const order = this.orders.find((o) => o.id === orderId);
    return order ? order.status : "Order not found";
  }
}

const tracking = new OrderTracking();
tracking.updateStatus(1, "Shipped");
console.log(tracking.getStatus(1)); // Shipped
tracking.updateStatus(1, "Delivered");
console.log(tracking.getStatus(1)); // Delivered
