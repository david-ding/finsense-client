import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/index";
import type { Holding } from "$lib/entities/holding";
import type { RootState } from "$lib/stores/root-state";
// import { prepareHeadersWithAuth } from "$lib/utils/store.utils";
const prepareHeadersWithAuth = (headers, { getState }) => {
  const token = (getState() as RootState).auth.token;

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};
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
