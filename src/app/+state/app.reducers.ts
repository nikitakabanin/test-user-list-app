import { createReducer, on } from '@ngrx/store';
import { IUser } from '../components/userslist/userslist/IUser';
import { EditUsersActions, UsersApiActions } from './app.actions';

interface State {
  users: IUser[];
  loadStatus: 'init' | 'loading' | 'loaded' | 'failed';
}
const initialState: State = {
  users: [],
  loadStatus: 'init',
};
const reducer = createReducer(
  initialState,
  on(EditUsersActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(EditUsersActions.clearUsers, (state) => ({ ...state, users: [] })),
  on(EditUsersActions.deleteUser, (state, { user }) => ({
    ...state,
    users: [...state.users.filter((e) => e.id !== user.id)],
  })),
  on(EditUsersActions.editUser, (state, { user }) => ({
    ...state,
    users: [
      ...state.users.filter((e) => e.id < user.id),
      user,
      ...state.users.filter((e) => e.id > user.id),
    ],
  })),
  on(UsersApiActions.loadUsers, (state) => ({
    ...state,
    loadStatus: 'loading' as const,
  })),
  on(UsersApiActions.loadUsersFailed, (state) => ({
    ...state,
    loadStatus: 'failed' as const,
  })),
  on(UsersApiActions.loadUsersSuccess, (state) => ({
    ...state,
    loadStatus: 'loaded' as const,
  }))
);
