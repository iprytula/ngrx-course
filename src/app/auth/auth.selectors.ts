import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const authState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(authState, (auth) => !!auth.user);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
