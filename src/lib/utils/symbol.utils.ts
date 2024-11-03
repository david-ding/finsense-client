import { Exchange } from "$lib/entities/exchange";

export const getExchangeFromSymbol = (symbol: string): string => {
  const [_, exchange] = symbol.split(".");

  return exchange ?? Exchange.US;
};

export const isUSSymbol = (symbol: string): boolean =>
  getExchangeFromSymbol(symbol) === Exchange.US;
