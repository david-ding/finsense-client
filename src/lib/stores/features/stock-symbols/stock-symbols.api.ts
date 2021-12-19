import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { StockSymbol } from "../../../entities/stock-symbol";

export const stockSymbolsApi = createApi({
  reducerPath: "stockSymbolsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    search: builder.query<Array<StockSymbol>, string>({
      query: (query) => `/stockSymbols?q=${query}`,
    }),
  }),
});

export const stockSymbolsApiEndpoints = stockSymbolsApi.endpoints;
