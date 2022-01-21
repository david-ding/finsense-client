import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/dist/query";
import type { ValidationErrors } from "./validation-errors";

export type Finsense = BaseQueryFn<
  string | FetchArgs,
  unknown,
  { status: string; data: { validationErrors: ValidationErrors } },
  unknown
>;
