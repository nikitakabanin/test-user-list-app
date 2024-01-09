import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './app.reducers';
export const USERS_FEATURE_KEY = 'users';
export const selectUsersFeature =
  createFeatureSelector<State>(USERS_FEATURE_KEY);
export const selectUsers = createSelector(
  selectUsersFeature,
  (state) => state.users
);
export const selectLoadStatus = createSelector(
  selectUsersFeature,
  (state) => state.loadStatus
);
