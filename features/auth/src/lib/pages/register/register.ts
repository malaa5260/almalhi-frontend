import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Button, Card, Input } from '@almalhi-frontend/ui';
import { RouterLink } from '@angular/router';
import { AuthService } from '@almalhi-frontend/data-access';
import { finalize } from 'rxjs';
@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule, RouterLink, Button, Card, Input],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  isSubmitting = signal(false);

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  get fullNameError(): string {
    const control = this.form.controls.fullName;
    if (!control.touched) return '';
    if (control.hasError('required')) return 'Full name is required';
    if (control.hasError('minlength')) return 'Full name must be at least 3 characters';
    return '';
  }

  get emailError(): string {
    const control = this.form.controls.email;
    if (!control.touched) return '';
    if (control.hasError('required')) return 'Email is required';
    if (control.hasError('email')) return 'Invalid email address';
    return '';
  }

  get passwordError(): string {
    const control = this.form.controls.password;
    if (!control.touched) return '';
    if (control.hasError('required')) return 'Password is required';
    if (control.hasError('minlength')) return 'Password must be at least 6 characters';
    return '';
  }

  get confirmPasswordError(): string {
    const control = this.form.controls.confirmPassword;
    if (!control.touched) return '';
    if (control.hasError('required')) return 'Confirm password is required';
    if (control.value !== this.form.controls.password.value) return 'Passwords do not match';
    return '';
  }


  register(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.confirmPasswordError) return;

    this.isSubmitting.set(true);

    const payload = this.form.getRawValue();

    this.authService.register(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          console.log('Registration success');
        },
        error: error => {
          console.error('Registration failed', error);
        },
      });
  }
}
