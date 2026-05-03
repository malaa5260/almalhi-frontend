import { Footer } from './../footer/footer';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Header } from '../header/header';
import { Toast } from '../toast/toast';

@Component({
  selector: 'almalhi-layout',
  imports: [Header, Footer, Toast],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  title = input<string>('Almalhi');
}
