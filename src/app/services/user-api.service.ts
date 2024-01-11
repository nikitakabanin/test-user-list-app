import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../components/userslist/userslist/IUser';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  users: Observable<IUser[]>;
  private http = inject(HttpClient);
  constructor() {
    this.users = this.http.get<IUser[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
  getUsers(): Observable<IUser[]> {
    return this.users;
  }
}
