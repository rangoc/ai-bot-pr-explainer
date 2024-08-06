class Notification {
  constructor() {
    this.notifications = [];
  }

  addNotification(notification) {
    this.notifications.push(notification);
  }

  removeNotification(notificationId) {
    this.notifications = this.notifications.filter(
      (n) => n.id !== notificationId
    );
  }

  displayNotifications() {
    return this.notifications;
  }
}

const notification = new Notification();
notification.addNotification({ id: 1, message: "Order shipped" });
notification.addNotification({ id: 2, message: "Payment received" });
console.log(notification.displayNotifications()); // Display all notifications
notification.removeNotification(1);
console.log(notification.displayNotifications()); // Display after removal
console.log("Hello");
