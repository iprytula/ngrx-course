import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { authReducer, AuthState } from "../auth/reducers";

export interface AppState {

}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("state before: ", state);
    console.log("action", action);

    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [logger] : [];

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};
