import { Inject, Injectable, OnDestroy } from '@angular/core';
import { IUser } from '../components/userslist/userslist/IUser';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements OnDestroy {
  //change userlist only with subject
  private userListKey = 'userlist';
  private userlistSubject$ = new BehaviorSubject<IUser[]>(this.getUserlist());
  public readonly userlistObservable$ = this.userlistSubject$.asObservable();
  private unsubscribe$ = new Subject<void>();
  private httpUsers = this.getUsersHttp();

  constructor(@Inject(UserApiService) private userApiService: UserApiService) {
    if (this.userlistSubject$.value.length === 0)
      this.getUsersHttp()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result) => this.userlistSubject$.next(result));
    this.userlistSubject$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        localStorage.setItem(this.userListKey, JSON.stringify(result));
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private getUsersHttp() {
    return this.userApiService.getUsers();
  }
  public setUserlist(list: IUser[]) {
    this.userlistSubject$.next(list);
  }
  private getUserlist(): IUser[] {
    return localStorage[this.userListKey] !== undefined &&
      JSON.parse(localStorage[this.userListKey]).length !== 0
      ? JSON.parse(localStorage[this.userListKey])
      : [];
  }
  public deleteByIndex(index: number) {
    let list = this.userlistSubject$.getValue();
    list = [...list.slice(0, index), ...list.slice(index + 1)];
    this.userlistSubject$.next(list);
  }
  public setCard(item: IUser) {
    const list = this.userlistSubject$.getValue();
    const index = list.findIndex((el) => el.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push(item);
    this.userlistSubject$.next(list);
  }
}
