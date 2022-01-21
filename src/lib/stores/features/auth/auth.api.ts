import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/index.js";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/dist/query/index.js";
import type { Credentials, LoginResponse } from "$lib/entities/auth";
import type { ValidationErrors } from "$lib/entities/validation-errors";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    { status: number; data: { validationErrors: ValidationErrors } },
    unknown
  >,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Credentials>({
      query(body) {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const authApiEndpoints = authApi.endpoints;
