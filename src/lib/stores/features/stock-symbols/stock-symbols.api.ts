import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { StockSymbol } from "$lib/entities/stock-symbol";
import { prepareHeadersWithAuth } from "$lib/utils/store.utils";

export const stockSymbolsApi = createApi({
  reducerPath: "stockSymbolsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", prepareHeaders: prepareHeadersWithAuth }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    search: builder.query<Array<StockSymbol>, string>({
      query: (query) => `/stockSymbols?q=${query}`,
    }),
  }),
});

export const stockSymbolsApiEndpoints = stockSymbolsApi.endpoints;
