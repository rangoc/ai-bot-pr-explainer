class Payment {
  constructor() {
    this.payments = [];
  }

  makePayment(orderId, amount) {
    const paymentId = this.payments.length + 1;
    const newPayment = { paymentId, orderId, amount, status: "Completed" };
    this.payments.push(newPayment);
    return newPayment;
  }

  checkPaymentStatus(paymentId) {
    const payment = this.payments.find(
      (payment) => payment.paymentId === paymentId
    );
    return payment ? payment.status : "Payment not found";
  }
}

const payment = new Payment();
const newPayment = payment.makePayment(1, 40);
console.log(payment.checkPaymentStatus(newPayment.paymentId)); // Completed
