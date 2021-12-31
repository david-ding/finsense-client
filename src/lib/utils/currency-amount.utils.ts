import type { CurrencyAmount } from "../entities/currency-amount";

export const createCurrencyAmount = (value: number | string, code?: string): CurrencyAmount => {
  code = code || "AUD";

  if (typeof value === "string") {
    const parsedValue = parseFloat(value.replaceAll(/[^0-9.]/g, ""));
    value = isNaN(parsedValue) ? null : parsedValue;
  }
  return { code, value };
};
