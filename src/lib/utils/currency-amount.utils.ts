import { Currency, type CurrencyAmount } from "$lib/entities/currency-amount";

export const zero = (code?: string): CurrencyAmount => ({
  code,
  value: 0,
});

export const createCurrencyAmount = (value: number | string, code?: string): CurrencyAmount => {
  code = code || Currency.AUD;

  if (typeof value === "string") {
    const parsedValue = parseFloat(value.replaceAll(/[^0-9.]/g, ""));
    value = isNaN(parsedValue) ? null : parsedValue;
  }
  return { code, value };
};

export const add = (...amounts: Array<CurrencyAmount>): CurrencyAmount => {
  const code = amounts.find((amount) => !!amount.code)?.code || Currency.AUD;
  const sumCents = amounts.reduce((_sum, amount) => _sum + amount.value * 100, 0);
  return { code, value: sumCents / 100 };
};

export const subtract = (amount1: CurrencyAmount, amount2: CurrencyAmount): CurrencyAmount => {
  const code = amount1.code || amount2.code || Currency.AUD;
  const diffCents = amount1.value * 100 - amount2.value * 100;
  return { code, value: diffCents / 100 };
};

export const multiply = (amount: CurrencyAmount, multiplier: number): CurrencyAmount => {
  const { code, value } = amount;
  const newValue = (value * 100 * multiplier) / 100;

  return { code, value: newValue };
};

export const isPositive = (amount: CurrencyAmount): boolean => {
  return amount?.value > 0;
};

export const isNegative = (amount: CurrencyAmount): boolean => {
  return amount?.value < 0;
};

export const percentageOf = (amount1: CurrencyAmount, amount2: CurrencyAmount): string => {
  return `${((amount1.value / amount2.value) * 100).toFixed(2)}%`;
};

export const convertToForeign = (
  amount: CurrencyAmount,
  exchangeRate: number,
  foreignCurrencyCode: string = Currency.AUD,
): CurrencyAmount => ({
  ...multiply(amount, exchangeRate),
  code: foreignCurrencyCode,
});
