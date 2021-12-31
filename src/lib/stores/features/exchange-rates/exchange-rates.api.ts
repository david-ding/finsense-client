import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { ExchangeRate } from "../../../entities/exchange-rate";

export const exchangeRatesApi = createApi({
  reducerPath: "exchangeRatesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    index: builder.query<Array<ExchangeRate>, void>({
      query: () => "/exchangeRates",
    }),
    update: builder.mutation<Array<ExchangeRate>, void>({
      query() {
        return {
          url: "/exchangeRates/update",
          method: "POST",
        };
      },
    }),
  }),
});

export const exchangeRatesApiEndpoints = exchangeRatesApi.endpoints;
