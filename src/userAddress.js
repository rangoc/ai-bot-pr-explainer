class UserAddress {
  constructor() {
    this.addresses = [];
  }

  addAddress(userId, address) {
    this.addresses.push({ userId, ...address });
  }

  removeAddress(addressId) {
    this.addresses = this.addresses.filter(
      (address) => address.id !== addressId
    );
  }

  displayAddresses(userId) {
    return this.addresses.filter((address) => address.userId === userId);
  }
}

const addressBook = new UserAddress();
addressBook.addAddress(1, { id: 1, street: "123 Main St", city: "Anytown" });
addressBook.addAddress(1, { id: 2, street: "456 Oak St", city: "Othertown" });
console.log(addressBook.displayAddresses(1)); // User addresses
addressBook.removeAddress(1);
console.log(addressBook.displayAddresses(1)); // Addresses after removal
