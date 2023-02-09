import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const authStateSelector = createFeatureSelector<AuthState>("auth");

export const isLoggedInSelector = createSelector(
  authStateSelector,
  auth => !!auth.user
);

export const isLoggedOutSelector = createSelector(
  isLoggedInSelector,
  loggedIn => !loggedIn
)
