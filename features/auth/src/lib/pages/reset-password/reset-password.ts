import { Button, Card, Input } from '@almalhi-frontend/ui';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'lib-reset-password',
  imports: [ReactiveFormsModule, RouterLink, Button, Card, Input],
  templateUrl: './reset-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  email = this.route.snapshot.queryParamMap.get('email') ?? '';
  code = this.route.snapshot.queryParamMap.get('code') ?? '';

  isSubmitting = signal(false);

  form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  get passwordError(): string {
    const control = this.form.controls.password;
    if (!control.touched) return '';
    if (control.hasError('required')) return 'Password is required';
    if (control.hasError('minlength')) return 'Min 6 characters';
    return '';
  }

  get confirmPasswordError(): string {
    const control = this.form.controls.confirmPassword;

    if (!control.touched) return '';
    if (control.hasError('required')) return 'Confirm password is required';
    if (control.value !== this.form.controls.password.value)
      return 'Passwords do not match';

    return '';
  }


  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.confirmPasswordError) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);

      console.log({
        email: this.email,
        code: this.code,
        ...this.form.getRawValue(),
      });

      this.router.navigate(['/auth/login']);
    }, 800);
  }
}
