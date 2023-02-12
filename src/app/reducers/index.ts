import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { authReducer, AuthState } from "../auth/reducers";

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

