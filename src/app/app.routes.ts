import { Routes } from '@angular/router';
import { BaseComponent } from './components/base/base/base.component';
import { UserslistComponent } from './components/userslist/userslist/userslist.component';

export const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'users', component: UserslistComponent },
  { path: '**', component: UserslistComponent },
];
