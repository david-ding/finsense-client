import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/dist/query/index.js";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/index.js";
import type { StockSplit } from "$lib/entities/stock-split";
import type { ValidationErrors } from "$lib/entities/validation-errors";
import { prepareHeadersWithAuth } from "$lib/utils/auth.utils";

export const stockSplitsApi = createApi({
  reducerPath: "stockSplitsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: prepareHeadersWithAuth,
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    { status: number; data: { validationErrors: ValidationErrors } },
    unknown
  >,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    index: builder.query<Array<StockSplit>, void>({
      query: () => "/stockSplits",
    }),
    create: builder.mutation<StockSplit, Partial<StockSplit>>({
      query(body) {
        return {
          url: "/stockSplits",
          method: "POST",
          body,
        };
      },
    }),
    update: builder.mutation<StockSplit, Partial<StockSplit>>({
      query({ id, ...body }) {
        return {
          url: `/stockSplits/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    delete: builder.mutation<{ id: string }, string>({
      query(id) {
        return {
          url: `/stockSplits/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const stockSplitsApiEndpoints = stockSplitsApi.endpoints;
