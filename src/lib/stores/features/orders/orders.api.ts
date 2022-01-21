import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/dist/query/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/index";
import type { Order } from "$lib/entities/order";
import type { ValidationErrors } from "$lib/entities/validation-errors";
import type { RootState } from "$lib/stores/root-state";
// import { prepareHeadersWithAuth } from "$lib/utils/store.utils";
const prepareHeadersWithAuth = (headers, { getState }) => {
  const token = (getState() as RootState).auth.token;

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};
export const ordersApi = createApi({
  reducerPath: "ordersApi",
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
