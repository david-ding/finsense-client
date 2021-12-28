import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import type { Order } from "../../../entities/order";
import type { ValidationErrors } from "../../../entities/validation-errors";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    { status: string; data: { validationErrors: ValidationErrors } },
    unknown
  >,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    index: builder.query<Array<Order>, void>({
      query: () => "/orders",
    }),
    create: builder.mutation<Order, Partial<Order>>({
      query(body) {
        return {
          url: "/orders",
          method: "POST",
          body,
        };
      },
    }),
    update: builder.mutation<Order, Partial<Order>>({
      query({ id, ...body }) {
        return {
          url: `/orders/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    delete: builder.mutation<{ id: string }, string>({
      query(id) {
        return {
          url: `/orders/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const ordersApiEndpoints = ordersApi.endpoints;
