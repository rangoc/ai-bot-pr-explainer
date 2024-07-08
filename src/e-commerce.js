// Utilities Module
const Utils = (() => {
  // Helper function to format currency
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  // Generate a unique identifier
  const generateId = () => {
    return "xxxx-xxxx-xxxx-xxxx".replace(/x/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    );
  };

  return {
    formatCurrency,
    generateId,
  };
})();

// Product Module
const ProductModule = (() => {
  const products = [
    { id: 1, name: "Laptop", price: 999.99, stock: 10 },
    { id: 2, name: "Smartphone", price: 499.99, stock: 25 },
    { id: 3, name: "Tablet", price: 299.99, stock: 30 },
  ];

  // Get all products
  const getProducts = () => products;

  // Get product by ID
  const getProductById = (id) => products.find((product) => product.id === id);

  // Update product stock
  const updateStock = (id, quantity) => {
    const product = getProductById(id);
    if (product) {
      product.stock -= quantity;
    }
  };

  return {
    getProducts,
    getProductById,
    updateStock,
  };
})();

// Cart Module
const CartModule = (() => {
  let cart = [];

  // Add product to cart
  const addToCart = (productId, quantity) => {
    const product = ProductModule.getProductById(productId);
    if (product && product.stock >= quantity) {
      const cartItem = cart.find((item) => item.product.id === productId);
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.push({ product, quantity });
      }
      ProductModule.updateStock(productId, quantity);
    } else {
      console.log("Insufficient stock or product not found");
    }
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    cart = cart.filter((item) => item.product.id !== productId);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Apply discount code
  const applyDiscount = (code) => {
    const discounts = { SAVE10: 0.1, SAVE20: 0.2 };
    const discount = discounts[code];
    if (discount) {
      return getCartTotal() * (1 - discount);
    } else {
      return getCartTotal();
    }
  };

  return {
    addToCart,
    removeFromCart,
    getCartTotal,
    applyDiscount,
  };
})();

// Order Module
const OrderModule = (() => {
  const orders = [];

  // Place order
  const placeOrder = (cart, discountCode) => {
    const total = CartModule.applyDiscount(discountCode);
    const order = {
      id: Utils.generateId(),
      items: cart,
      total,
      date: new Date(),
    };
    orders.push(order);
    return order;
  };

  // Get order by ID
  const getOrderById = (id) => orders.find((order) => order.id === id);

  // Get all orders
  const getOrders = () => orders;

  return {
    placeOrder,
    getOrderById,
    getOrders,
  };
})();

// UI Module
const UIModule = (() => {
  // Display products
  const displayProducts = () => {
    const products = ProductModule.getProducts();
    products.forEach((product) => {
      console.log(
        `ID: ${product.id}, Name: ${
          product.name
        }, Price: ${Utils.formatCurrency(product.price)}, Stock: ${
          product.stock
        }`
      );
    });
  };

  // Display cart
  const displayCart = () => {
    const cart = CartModule.getCartTotal();
    cart.forEach((item) => {
      console.log(
        `Product: ${item.product.name}, Quantity: ${
          item.quantity
        }, Total: ${Utils.formatCurrency(item.product.price * item.quantity)}`
      );
    });
  };

  // Display orders
  const displayOrders = () => {
    const orders = OrderModule.getOrders();
    orders.forEach((order) => {
      console.log(
        `Order ID: ${order.id}, Total: ${Utils.formatCurrency(
          order.total
        )}, Date: ${order.date}`
      );
    });
  };

  return {
    displayProducts,
    displayCart,
    displayOrders,
  };
})();

// Example Usage
UIModule.displayProducts();
CartModule.addToCart(1, 2);
CartModule.addToCart(2, 1);
UIModule.displayCart();
const order = OrderModule.placeOrder(CartModule.getCartTotal(), "SAVE10");
console.log("Order placed:", order);
UIModule.displayOrders();
