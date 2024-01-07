import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {}
