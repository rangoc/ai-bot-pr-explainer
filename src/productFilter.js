class ProductFilter {
  constructor(products) {
    this.products = products;
  }

  filterByCategory(category) {
    return this.products.filter((product) => product.category === category);
  }

  filterByPriceRange(min, max) {
    return this.products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }
}

const products = [
  { id: 1, name: "Product 1", category: "Electronics", price: 100 },
  { id: 2, name: "Product 2", category: "Clothing", price: 50 },
  { id: 3, name: "Product 3", category: "Electronics", price: 200 },
];

const filter = new ProductFilter(products);
console.log(filter.filterByCategory("Electronics")); // Electronics products
console.log(filter.filterByPriceRange(50, 150)); // Products within price range
