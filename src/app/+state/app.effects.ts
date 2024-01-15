import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EditUsersActions, UsersApiActions } from './app.actions';
import {
  catchError,
  map,
  switchMap,
  of,
  concatMap,
  tap,
  exhaustMap,
} from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { IUser } from '../components/userslist/userslist/IUser';

export const loadUsersEffect$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(LocalStorageService);
    return actions$.pipe(
      ofType(UsersApiActions.loadUsers),
      switchMap(() =>
        api.userlistObservable$.pipe(
          map((result: IUser[]) =>
            UsersApiActions.loadUsersSuccess({ users: result })
          ),
          catchError((error) => of(UsersApiActions.loadUsersFailed({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const editUserEffect$ = createEffect(
  (actions$ = inject(Actions), storage = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(EditUsersActions.editUser),
      tap(({ user }) => {
        storage.setCard(user);
      })
    ),
  { functional: true, dispatch: false }
);
export const addUserEffect$ = createEffect(
  (actions$ = inject(Actions), storage = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(EditUsersActions.addUser),
      tap(({ user }) => {
        storage.setCard(user);
      })
    ),
  { functional: true, dispatch: false }
);
export const deleteUserEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(EditUsersActions.deleteUser),
      tap(({ user }) => {
        storage.deleteCard(user);
      })
    ),
  { functional: true, dispatch: false }
);
export const clearUsersEffect = createEffect(
  (actions$ = inject(Actions), storage = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(EditUsersActions.clearUsers),
      tap(() => storage.clearUsers())
    ),
  { functional: true, dispatch: false }
);
// export const localStorageEffect$ = createEffect((actions$ = inject(Actions), api = inject(LocalStorageService)) =>actions$.pipe(ofType(EditUsersActions.)))
