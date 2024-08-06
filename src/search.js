class Search {
  constructor(products) {
    this.products = products;
  }

  searchByName(name) {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Smartphone" },
  { id: 3, name: "Tablet" },
];

const search = new Search(products);
console.log(search.searchByName("lap")); // Products matching 'lap'
console.log(search.searchByName("phone")); // Products matching 'phone'
console.log("Hello");
