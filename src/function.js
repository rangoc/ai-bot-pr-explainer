function processTransaction(transaction, user, products, discounts) {
  // Step 1: Validate transaction data
  const isValidTransaction = (() => {
    if (!transaction.id || !transaction.items || !transaction.total)
      return false;
    if (typeof transaction.total !== "number" || transaction.total <= 0)
      return false;
    return true;
  })();

  if (!isValidTransaction) {
    throw new Error("Invalid transaction data");
  }

  // Step 2: Apply user-specific logic
  const userScore = (() => {
    let score = 0;
    if (user.isMember) score += 10;
    if (user.age > 50) score += 5;
    if (user.purchases > 100) score += 20;
    return score;
  })();

  const userDiscount = userScore > 20 ? 0.1 : 0.05;

  // Step 3: Calculate discounts
  const applyDiscounts = (items) => {
    return items.map((item) => {
      const discount = discounts[item.id] || 0;
      return {
        ...item,
        discountedPrice: item.price - item.price * discount,
      };
    });
  };

  const discountedItems = applyDiscounts(transaction.items);

  // Step 4: Calculate total price with user discount
  const totalWithDiscount =
    discountedItems.reduce((total, item) => {
      return total + item.discountedPrice * item.quantity;
    }, 0) *
    (1 - userDiscount);

  // Step 5: Validate stock availability
  const isStockAvailable = discountedItems.every((item) => {
    const product = products.find((p) => p.id === item.id);
    return product && product.stock >= item.quantity;
  });

  if (!isStockAvailable) {
    throw new Error("Insufficient stock for transaction");
  }

  // Step 6: Update stock levels
  discountedItems.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      product.stock -= item.quantity;
    }
  });

  // Step 7: Log transaction details
  const logTransaction = (tx, user, total) => {
    console.log(`Transaction ID: ${tx.id}`);
    console.log(`User ID: ${user.id}, Member: ${user.isMember}`);
    console.log(`Total after discount: $${total.toFixed(2)}`);
    console.log("Items:");
    tx.items.forEach((item) => {
      console.log(
        `  - ${item.name}: ${item.quantity} x $${item.discountedPrice.toFixed(
          2
        )}`
      );
    });
  };

  logTransaction(transaction, user, totalWithDiscount);

  // Step 8: Return transaction summary
  return {
    transactionId: transaction.id,
    userId: user.id,
    total: totalWithDiscount,
    items: discountedItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.discountedPrice,
    })),
  };
}

// Example usage:
const transaction = {
  id: "txn-12345",
  items: [
    { id: 1, name: "Laptop", price: 999.99, quantity: 1 },
    { id: 2, name: "Smartphone", price: 499.99, quantity: 2 },
  ],
  total: 1999.97,
};

const user = {
  id: "user-67890",
  isMember: true,
  age: 55,
  purchases: 120,
};

const products = [
  { id: 1, name: "Laptop", stock: 10 },
  { id: 2, name: "Smartphone", stock: 25 },
];

const discounts = {
  1: 0.1, // 10% discount on Laptop
  2: 0.2, // 20% discount on Smartphone
};

const result = processTransaction(transaction, user, products, discounts);
console.log(result);
