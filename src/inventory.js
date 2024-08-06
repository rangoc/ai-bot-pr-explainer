class Inventory {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productId) {
    this.products = this.products.filter((product) => product.id !== productId);
  }

  checkStock(productId) {
    const product = this.products.find((product) => product.id === productId);
    return product ? product.stock : "Out of stock";
  }
}

const inventory = new Inventory();
inventory.addProduct({ id: 1, name: "Product 1", stock: 10 });
inventory.addProduct({ id: 2, name: "Product 2", stock: 0 });
console.log(inventory.checkStock(1)); // 10
console.log(inventory.checkStock(2)); // Out of stock
