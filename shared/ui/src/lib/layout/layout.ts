import { Footer } from './../footer/footer';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Header } from '../header/header';

@Component({
  selector: 'almalhi-layout',
  imports: [Header, Footer],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  title = input<string>('Almalhi');
}
