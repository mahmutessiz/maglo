export function formatCurrency(amount: number, currency: string = "USD") {
  // Handle common currency symbols that might not display properly with Intl.NumberFormat
  switch (currency) {
    case "TRY":
      return `${amount < 0 ? "−" : ""}₺${Math.abs(amount).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })}`;
    case "USD":
      return `${amount < 0 ? "−" : ""}${Math.abs(amount).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })}`;
    case "EUR":
      return `${amount < 0 ? "−" : ""}€${Math.abs(amount).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })}`;
    case "GBP":
      return `${amount < 0 ? "−" : ""}£${Math.abs(amount).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })}`;
    default:
      // For other currencies, use Intl.NumberFormat
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
  }
}
