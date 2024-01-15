import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as appSelectors from './app.selectors';
import { UsersApiActions, EditUsersActions } from './app.actions';
import { IUser } from '../components/userslist/userslist/IUser';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  store = inject(Store);
  users$ = this.store.pipe(select(appSelectors.selectUsers));
  loadStatus$ = this.store.select(appSelectors.selectLoadStatus);
  getUsers() {
    return this.users$;
  }
  loadUsers() {
    this.store.dispatch(UsersApiActions.loadUsers());
  }
  getLoadStatus() {
    return this.loadStatus$;
  }
  deleteUser(user: IUser) {
    this.store.dispatch(EditUsersActions.deleteUser({ user }));
  }
  editUser(user: IUser) {
    this.store.dispatch(EditUsersActions.editUser({ user }));
  }
  addUser(user: IUser) {
    this.store.dispatch(EditUsersActions.addUser({ user }));
  }
  clearUser() {
    this.store.dispatch(EditUsersActions.clearUsers());
  }
}
