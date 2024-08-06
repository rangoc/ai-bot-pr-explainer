class Shipping {
  constructor() {
    this.addresses = [];
  }

  addAddress(user, address) {
    this.addresses.push({ user, address });
  }

  calculateShippingCost(address) {
    const baseCost = 5;
    const distanceFactor = address.distance / 10;
    return baseCost + distanceFactor;
  }
}

const shipping = new Shipping();
const userAddress = {
  user: "John Doe",
  address: { street: "123 Main St", city: "Anytown", distance: 50 },
};
shipping.addAddress(userAddress.user, userAddress.address);
console.log(shipping.calculateShippingCost(userAddress.address)); // Shipping cost
