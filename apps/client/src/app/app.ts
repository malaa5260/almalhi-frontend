import { Component, signal } from '@angular/core';
import { Button, Card, Input } from '@almalhi-frontend/ui';

@Component({
  imports: [Button, Card, Input],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'client';
  name = signal('');

  onNameChange(value: string): void {
    this.name.set(value);
  }

  save() {
    console.log('Button clicked!');
  }

  cancel() {
    console.log('Cancel clicked!');
  }
}
