import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/index.js";
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
  }),
});

export const holdingsApiEndpoints = holdingsApi.endpoints;
