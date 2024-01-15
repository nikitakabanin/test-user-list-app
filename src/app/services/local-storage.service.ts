import { Inject, Injectable, OnDestroy } from '@angular/core';
import { IUser } from '../components/userslist/userslist/IUser';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { UserApiService } from './user-api.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements OnDestroy {
  //change userlist only with subject
  private userListKey = 'userlist';
  private userlistSubject$ = new BehaviorSubject<IUser[]>(this.getUserlist());
  public readonly userlistObservable$ = this.userlistSubject$.asObservable();
  private unsubscribe$ = new Subject<void>();

  constructor(@Inject(UserApiService) private userApiService: UserApiService) {
    if (this.userlistSubject$.value.length === 0)
      this.getUsersWithHttp()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result) => this.userlistSubject$.next(result));
    this.userlistSubject$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        localStorage.setItem(this.userListKey, JSON.stringify(result));
      });
  }
  public setUserlist(list: IUser[]) {
    this.userlistSubject$.next(list);
  }
  private getUserlist(): IUser[] {
    return localStorage[this.userListKey]
      ? JSON.parse(localStorage[this.userListKey])
      : [];
  }
  public deleteCard(item: IUser) {
    this.userlistSubject$.next(
      this.userlistSubject$.getValue().filter((e) => e.id !== item.id)
    );
  }
  public setCard(item: IUser) {
    const list = [...this.userlistSubject$.value];
    const index = list.findIndex((el) => el.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    this.userlistSubject$.next(list);
  }
  public clearUsers() {
    localStorage[this.userListKey] = [];
  }
  private getUsersWithHttp() {
    return this.userApiService.getUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
