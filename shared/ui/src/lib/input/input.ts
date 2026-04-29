import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';

@Component({
  selector: 'almalhi-input',
  imports: [],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<InputType>('text');
  value = input<string | number>('');
  error = input<string>('');
  disabled = input<boolean>(false);

  valueChange= output<string>();

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
