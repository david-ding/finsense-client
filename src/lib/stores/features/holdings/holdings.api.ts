import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { Holding } from "$lib/entities/holding";
import { prepareHeadersWithAuth } from "$lib/utils/auth.utils";

export const holdingsApi = createApi({
  reducerPath: "holdingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api", prepareHeaders: prepareHeadersWithAuth }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    index: builder.query<Array<Holding>, void>({
      query: () => "/holdings",
    }),
    updateEodQuotes: builder.mutation<void, void>({
      query() {
        return {
          url: "/holdings/updateEodQuotes",
          method: "POST",
        };
      },
    }),
    priceHistory: builder.query<Array<{ date: string; price: number }>, { symbol: string }>({
      query: ({ symbol }) => `/holdings/${symbol}/priceHistory`,
    }),
  }),
});

export const holdingsApiEndpoints = holdingsApi.endpoints;
