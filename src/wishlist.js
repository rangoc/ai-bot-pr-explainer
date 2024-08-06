class Wishlist {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }

  displayItems() {
    return this.items.map((item) => item.name);
  }
}

const wishlist = new Wishlist();
wishlist.addItem({ id: 1, name: "Product 1" });
wishlist.addItem({ id: 2, name: "Product 2" });
console.log(wishlist.displayItems()); // ['Product 1', 'Product 2']
wishlist.removeItem(1);
console.log(wishlist.displayItems()); // ['Product 2']
