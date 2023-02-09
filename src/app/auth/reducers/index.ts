import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from "@ngrx/store";
import { loginAction, logoutAction } from "../auth.actions";
import { User } from "../model/user.model";

export const authFeatureKey = "auth";

export interface AppState {
  auth: AuthState
}

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

// export const reducers: ActionReducerMap<AuthState> = {

// };

export const authReducer = createReducer(
  initialAuthState,
  on(loginAction, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(logoutAction, (state, action) => {
    return {
      user: undefined
    }
  })
);
