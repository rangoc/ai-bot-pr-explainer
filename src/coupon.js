class Coupon {
  constructor() {
    this.coupons = [];
  }

  addCoupon(coupon) {
    this.coupons.push(coupon);
  }

  applyCoupon(code, totalAmount) {
    const coupon = this.coupons.find((c) => c.code === code);
    if (coupon) {
      return totalAmount - (totalAmount * coupon.discount) / 100;
    } else {
      return totalAmount;
    }
  }
}

const coupon = new Coupon();
coupon.addCoupon({ code: "SAVE10", discount: 10 });
console.log(coupon.applyCoupon("SAVE10", 100)); // 90
console.log(coupon.applyCoupon("NOCOUPON", 100)); // 100
