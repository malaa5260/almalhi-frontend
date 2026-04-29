import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'almalhi-button',
  imports: [],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  label = input<string>('Button');
  variant = input<Variant>('primary');
  size = input<Size>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  icon = input<string | null>(null);
  iconPosition = input<'start' | 'end'>('start');
  routerLink = input<string | null>(null);

  clicked = output<void>();
  private readonly router = inject(Router);

  onClick() {
    if (this.disabled() || this.loading()) return;

    const link = this.routerLink();

    if (link) {
      Array.isArray(link)
        ? this.router.navigate(link)
        : this.router.navigateByUrl(link);

        return;
    }

    this.clicked.emit();
  }
}
