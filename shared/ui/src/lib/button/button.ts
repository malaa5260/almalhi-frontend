import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
}
