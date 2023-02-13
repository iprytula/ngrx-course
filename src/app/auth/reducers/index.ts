import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import * as AuthActions from '../auth.actions';
import { User } from '../model/user.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: null,
};

// export const reducers: ActionReducerMap<AuthState> = {

// };

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: null,
    };
  })
);
