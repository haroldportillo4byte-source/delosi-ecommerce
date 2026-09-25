type Currency = "USD" | "PEN";

const currencyFormatters: Record<Currency, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
  PEN: new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }),
};

export function formatPrice(amount: number, currency: Currency = "USD"): string {
  return currencyFormatters[currency].format(amount);
}
