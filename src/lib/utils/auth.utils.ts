import { goto } from "$app/navigation";
import { LOGIN } from "$lib/constants/routes";
import { authActions } from "$lib/stores/features/auth/auth.store";
import type { AnyAction, Dispatch } from "redux";

const prepareHeadersWithAuth = (headers: Headers): Headers => {
  const token = localStorage.getItem("token");

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};

const logout = (dispatch: Dispatch<AnyAction>): void => {
  dispatch(authActions.logout());
  localStorage.clear();
  goto(LOGIN);
};

export { prepareHeadersWithAuth, logout };
