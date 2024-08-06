class Subscription {
  constructor() {
    this.subscriptions = [];
  }

  addSubscription(subscription) {
    this.subscriptions.push(subscription);
  }

  removeSubscription(subscriptionId) {
    this.subscriptions = this.subscriptions.filter(
      (s) => s.id !== subscriptionId
    );
  }

  getSubscriptions(userId) {
    return this.subscriptions.filter((s) => s.userId === userId);
  }
}

const subscription = new Subscription();
subscription.addSubscription({ id: 1, userId: 1, plan: "Premium" });
subscription.addSubscription({ id: 2, userId: 1, plan: "Basic" });
console.log(subscription.getSubscriptions(1)); // Subscriptions for user 1
subscription.removeSubscription(1);
console.log(subscription.getSubscriptions(1)); // Subscriptions after removal
console.log("Hello");
