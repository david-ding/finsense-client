import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import type { ExchangeRate } from "$lib/entities/exchange-rate";
import type { RootState } from "$lib/stores/root-state";
// import { prepareHeadersWithAuth } from "$lib/utils/store.utils";
const prepareHeadersWithAuth = (headers, { getState }) => {
  const token = (getState() as RootState).auth.token;

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};
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
