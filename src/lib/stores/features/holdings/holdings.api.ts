import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { Holding } from "../../../entities/holding";

export const holdingsApi = createApi({
  reducerPath: "holdingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    index: builder.query<Array<Holding>, void>({
      query: () => "/holdings",
    }),
  }),
});

export const holdingsApiEndpoints = holdingsApi.endpoints;
