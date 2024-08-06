class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  getTotalPrice() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}

const cart = new Cart();
cart.addItem({ id: 1, name: "Product 1", price: 10, quantity: 2 });
cart.addItem({ id: 2, name: "Product 2", price: 20, quantity: 1 });
console.log(cart.getTotalPrice()); // 40
cart.removeItem(1);
console.log(cart.getTotalPrice()); // 20
