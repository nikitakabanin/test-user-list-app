import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '../services/user-api.service';
import { UsersApiActions } from './app.actions';
import { catchError, map, switchMap, of } from 'rxjs';

export const userEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(UserApiService);
    return actions$.pipe(
      ofType(UsersApiActions.loadUsers),
      switchMap(() =>
        api.getUsers().pipe(
          map(
            (result) => UsersApiActions.loadUsersSuccess({ users: result }),
            catchError((error) =>
              of(UsersApiActions.loadUsersFailed({ error }))
            )
          )
        )
      )
    );
  },
  { functional: true }
);
