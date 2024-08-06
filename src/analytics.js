class Analytics {
  constructor() {
    this.events = [];
  }

  trackEvent(event) {
    this.events.push(event);
  }

  getEventCount(eventType) {
    return this.events.filter((e) => e.type === eventType).length;
  }
}

const analytics = new Analytics();
analytics.trackEvent({ type: "page_view", page: "home" });
analytics.trackEvent({ type: "click", element: "buy_button" });
analytics.trackEvent({ type: "page_view", page: "product" });
console.log(analytics.getEventCount("page_view")); // Count of page views
console.log(analytics.getEventCount("click")); // Count of clicks
console.log("Hello");
