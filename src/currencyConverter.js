class CurrencyConverter {
  constructor() {
    this.rates = {};
  }

  setRate(currency, rate) {
    this.rates[currency] = rate;
  }

  convert(amount, fromCurrency, toCurrency) {
    const fromRate = this.rates[fromCurrency];
    const toRate = this.rates[toCurrency];
    if (fromRate && toRate) {
      return (amount / fromRate) * toRate;
    } else {
      return null;
    }
  }
}

const converter = new CurrencyConverter();
converter.setRate("USD", 1);
converter.setRate("EUR", 0.85);
console.log(converter.convert(100, "USD", "EUR")); // Convert USD to EUR
console.log("Hello");
