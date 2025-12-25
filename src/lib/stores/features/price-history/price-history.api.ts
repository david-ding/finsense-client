import type { CurrencyAmount } from "$lib/entities/currency-amount";
import type { ValidationErrors } from "$lib/entities/validation-errors";
import { prepareHeadersWithAuth } from "$lib/utils/auth.utils";
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import type { PriceHistory } from "./price-history.store";

export const priceHistoryApi = createApi({
  reducerPath: "priceHistoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: prepareHeadersWithAuth,
  }) as BaseQueryFn<string | FetchArgs>,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    symbolPriceHistory: builder.query<PriceHistory[], string>({
      query: (symbol) => `/holdings/${symbol}/priceHistory`,
    }),
  }),
});

export const priceHistoryApiEndpoints = priceHistoryApi.endpoints;
