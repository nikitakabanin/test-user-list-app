import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUser } from '../userslist/userslist/IUser';
import { Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-userlist-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDividerModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './userlist-dialog.component.html',
  styleUrl: './userlist-dialog.component.scss',
})
export class UserlistDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public dialogRef: MatDialogRef<UserlistDialogComponent>
  ) {}

  cancelDialog() {
    this.dialogRef.close();
  }
  saveDialog() {
    this.dialogRef.close(this.data);
  }
}
