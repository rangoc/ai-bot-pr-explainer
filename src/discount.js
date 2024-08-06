class Discount {
  constructor() {
    this.discounts = [];
  }

  addDiscount(discount) {
    this.discounts.push(discount);
  }

  applyDiscount(code, totalAmount) {
    const discount = this.discounts.find((d) => d.code === code);
    if (discount) {
      return totalAmount - (totalAmount * discount.percentage) / 100;
    } else {
      return totalAmount;
    }
  }
}

const discount = new Discount();
discount.addDiscount({ code: "SUMMER20", percentage: 20 });
console.log(discount.applyDiscount("SUMMER20", 100)); // 80
console.log(discount.applyDiscount("WINTER10", 100)); // 100
console.log("Hello");
