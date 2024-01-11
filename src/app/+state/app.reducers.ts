import { createFeature, createReducer, on } from '@ngrx/store';
import { IUser } from '../components/userslist/userslist/IUser';
import { EditUsersActions, UsersApiActions } from './app.actions';

export interface State {
  users: IUser[];
  loadStatus: 'init' | 'loading' | 'loaded' | 'failed';
}
const initialState: State = {
  users: [{ id: 1, email: 'asd', name: 'asd', username: 'f' }],
  loadStatus: 'init',
};

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
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
    on(UsersApiActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users: users,
      loadStatus: 'loaded' as const,
    }))
  ),
});
// export const reducer = createReducer(
//   initialState,
//   on(EditUsersActions.addUser, (state, { user }) => ({
//     ...state,
//     users: [...state.users, user],
//   })),
//   on(EditUsersActions.clearUsers, (state) => ({ ...state, users: [] })),
//   on(EditUsersActions.deleteUser, (state, { user }) => ({
//     ...state,
//     users: [...state.users.filter((e) => e.id !== user.id)],
//   })),
//   on(EditUsersActions.editUser, (state, { user }) => ({
//     ...state,
//     users: [
//       ...state.users.filter((e) => e.id < user.id),
//       user,
//       ...state.users.filter((e) => e.id > user.id),
//     ],
//   })),
//   on(UsersApiActions.loadUsers, (state) => ({
//     ...state,
//     loadStatus: 'loading' as const,
//   })),
//   on(UsersApiActions.loadUsersFailed, (state) => ({
//     ...state,
//     loadStatus: 'failed' as const,
//   })),
//   on(UsersApiActions.loadUsersSuccess, (state) => ({
//     ...state,
//     loadStatus: 'loaded' as const,
//   }))
// );
