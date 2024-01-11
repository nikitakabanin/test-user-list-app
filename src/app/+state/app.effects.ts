import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EditUsersActions, UsersApiActions } from './app.actions';
import { catchError, map, switchMap, of, concatMap, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { IUser } from '../components/userslist/userslist/IUser';

export const userEffect$ = createEffect(
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

export const editUsersEffect$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(LocalStorageService);
    return actions$.pipe(
      ofType(EditUsersActions.addUser),
      tap(({ user }) => api.setCard(user))
    );
  },
  { functional: true }
);
