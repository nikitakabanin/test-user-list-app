import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../components/userslist/userslist/IUser';

export const UsersApiActions = createActionGroup({
  source: 'Users API',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: IUser[] }>(),
    'Load Users Failed': props<{ error: Error }>(),
  },
});
export const EditUsersActions = createActionGroup({
  source: 'Edit Users',
  events: {
    'Delete User': props<{ user: IUser }>(),
    'Edit User': props<{ user: IUser }>(),
    'Add User': props<{ user: IUser }>(),
    'Clear Users': emptyProps(),
  },
});
