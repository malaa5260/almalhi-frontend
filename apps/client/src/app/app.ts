import { Component } from '@angular/core';
import { Button } from '@almalhi-frontend/ui';

@Component({
  imports: [Button],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'client';
}
