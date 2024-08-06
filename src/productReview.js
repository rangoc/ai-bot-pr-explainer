class ProductReview {
  constructor() {
    this.reviews = [];
  }

  addReview(productId, review) {
    this.reviews.push({ productId, ...review });
  }

  removeReview(reviewId) {
    this.reviews = this.reviews.filter((review) => review.id !== reviewId);
  }

  displayReviews(productId) {
    return this.reviews.filter((review) => review.productId === productId);
  }
}

const review = new ProductReview();
review.addReview(1, {
  id: 1,
  user: "John",
  rating: 5,
  comment: "Great product!",
});
review.addReview(1, {
  id: 2,
  user: "Jane",
  rating: 4,
  comment: "Good quality.",
});
console.log(review.displayReviews(1)); // Reviews for product 1
review.removeReview(1);
console.log(review.displayReviews(1)); // Reviews for product 1 after removal
