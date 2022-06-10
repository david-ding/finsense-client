import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/index.js";
import type { StockSymbol } from "$lib/entities/stock-symbol";
import { prepareHeadersWithAuth } from "$lib/utils/auth.utils";

export const stockSymbolsApi = createApi({
  reducerPath: "stockSymbolsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", prepareHeaders: prepareHeadersWithAuth }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    search: builder.query<Array<StockSymbol>, string>({
      query: (query) => `/stockSymbols?q=${query}`,
    }),
    update: builder.mutation<void, void>({
      query() {
        return {
          url: "/stockSymbols/update",
          method: "POST",
        };
      },
    }),
  }),
});

export const stockSymbolsApiEndpoints = stockSymbolsApi.endpoints;
