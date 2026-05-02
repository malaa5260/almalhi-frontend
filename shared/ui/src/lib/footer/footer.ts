import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

type FooterLink = {
  label: string;
  path: string;
};

@Component({
  selector: 'almalhi-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {

  title = input<string>('Almalhi');

  links = input<FooterLink[]>([
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
  ]);

  currentYear = new Date().getFullYear();

}
