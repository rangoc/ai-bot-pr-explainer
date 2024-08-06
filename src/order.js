class Order {
  constructor() {
    this.orders = [];
  }

  createOrder(cart, user) {
    const orderId = this.orders.length + 1;
    const newOrder = { orderId, items: cart.items, user, status: "Pending" };
    this.orders.push(newOrder);
    return newOrder;
  }

  getOrderDetails(orderId) {
    return this.orders.find((order) => order.orderId === orderId);
  }
}

const order = new Order();
const cart = { items: [{ id: 1, name: "Product 1", price: 10, quantity: 2 }] };
const user = { id: 1, name: "John Doe" };
const newOrder = order.createOrder(cart, user);
console.log(order.getOrderDetails(newOrder.orderId)); // Order details
console.log("Hello");
