class ProductSorting {
  constructor(products) {
    this.products = products;
  }

  sortByPrice(order = "asc") {
    return this.products.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
  }

  sortByName(order = "asc") {
    return this.products.sort((a, b) =>
      order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }
}

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
  { id: 3, name: "Tablet", price: 800 },
];

const sorting = new ProductSorting(products);
console.log(sorting.sortByPrice()); // Sort by price ascending
console.log(sorting.sortByName("desc")); // Sort by name descending
console.log("Hello");
