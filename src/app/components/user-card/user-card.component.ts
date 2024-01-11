import {
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { IUser } from '../userslist/userslist/IUser';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { LocalStorageService } from '../../services/local-storage.service';
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [LocalStorageService],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) info?: IUser;
  @Output() editCard: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteCard: EventEmitter<void> = new EventEmitter<void>();
  @HostBinding('class.hideComponent') hideComponent = false;
  toDelete() {
    this.deleteCard.emit();
  }
  toEdit() {
    this.editCard.emit();
  }
}
