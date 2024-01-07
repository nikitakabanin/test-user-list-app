import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { UserCardComponent } from '../../user-card/user-card.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { IUser } from './IUser';
import { UserApiService } from '../../../services/user-api.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserlistDialogComponent } from '../../userlist-dialog/userlist-dialog.component';
import { LocalStorageService } from '../../../services/local-storage.service';
@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [
    UserCardComponent,
    NgFor,
    UserCardComponent,
    NgIf,
    AsyncPipe,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.scss',
  providers: [UserApiService, LocalStorageService],
})
export class UserslistComponent implements OnDestroy {
  nextUniqueId = 0;
  userlist: IUser[] = [];
  users$: Observable<IUser[]>;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(LocalStorageService) private storageService: LocalStorageService,
    public dialog: MatDialog
  ) {
    this.users$ = storageService.userlistObservable$;
    this.users$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      this.userlist = result;
      this.nextUniqueId === 0 ? (this.nextUniqueId = result.length) : 0;
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  createCardDialog() {
    const dialogRef = this.dialog.open(UserlistDialogComponent, {
      data: {
        id: this.nextUniqueId++ + 1,
        email: '',
        name: '',
        username: '',
      },
      autoFocus: true,
    });
    dialogRef.afterClosed().subscribe((result: IUser) => {
      if (result) this.storageService.setCard(result);
      else this.nextUniqueId--;
    });
  }
  editCardDialog(user: IUser) {
    const dialogRef = this.dialog.open(UserlistDialogComponent, {
      data: { ...user },
      autoFocus: true,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.storageService.setCard(result);
      });
  }

  deleteCard(index: number) {
    this.storageService.deleteByIndex(index);
  }
}
