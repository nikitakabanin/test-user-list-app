import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../components/userslist/userslist/IUser';
import { Observable } from 'rxjs';

@Injectable()
export class UserApiService {
  users: Observable<IUser[]>;
  constructor(private http: HttpClient) {
    this.users = this.http.get<IUser[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
  getUsers(): Observable<IUser[]> {
    return this.users;
  }
}
