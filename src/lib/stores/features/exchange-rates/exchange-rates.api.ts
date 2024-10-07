import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { ExchangeRate } from "$lib/entities/exchange-rate";
import { prepareHeadersWithAuth } from "$lib/utils/auth.utils";

export const exchangeRatesApi = createApi({
  reducerPath: "exchangeRatesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", prepareHeaders: prepareHeadersWithAuth }),
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
