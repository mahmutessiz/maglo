export function formatCurrency(amount: number, currency: string = "USD") {
  switch (currency) {
    case "TRY":
      return `${amount < 0 ? "−" : ""}₺${Math.abs(amount).toLocaleString("tr-TR", {
        maximumFractionDigits: 0,
      })}`;
    case "USD":
      return `${amount < 0 ? "−" : ""}${Math.abs(amount).toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })}`;
    case "EUR":
      return `${amount < 0 ? "−" : ""}€${Math.abs(amount).toLocaleString("de-DE", {
        maximumFractionDigits: 0,
      })}`;
    case "GBP":
      return `${amount < 0 ? "−" : ""}£${Math.abs(amount).toLocaleString("en-GB", {
        maximumFractionDigits: 0,
      })}`;
    default:
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
  }
}
