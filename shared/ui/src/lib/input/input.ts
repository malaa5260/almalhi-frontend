import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';

@Component({
  selector: 'almalhi-input',
  imports: [],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],

})
export class Input implements ControlValueAccessor {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<InputType>('text');
  error = input<string>('');

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
