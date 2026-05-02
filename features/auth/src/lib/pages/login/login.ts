import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button, Card, Input } from '@almalhi-frontend/ui';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'lib-login',
  imports: [ReactiveFormsModule, RouterLink, Button, Card, Input],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);

  isSubmitting = false;


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  get emailError(): string {
    const emailControl = this.form.get('email');

    if (!emailControl?.touched) return '';
    if (emailControl.hasError('required')) return 'Email is required';
    if (emailControl.hasError('email')) return 'Invalid email address';

    return '';
  }

  get passwordError(): string {
    const passcontrol = this.form.get('password');

    if (!passcontrol?.touched) return '';
    if (passcontrol.hasError('required')) return 'Password is required';
    if (passcontrol.hasError('minlength')) return 'Password must be at least 6 characters';

    return '';
  }

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
      console.log(this.form.getRawValue());
    }, 800);
  }
}
