import { Button, Card, Input } from '@almalhi-frontend/ui';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'lib-forgot-password',
  imports: [ReactiveFormsModule, RouterLink, Button, Card, Input],
  templateUrl: './forgot-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);

   isSubmitting = false;

   form = this.fb.group({
     email: ['', [Validators.required, Validators.email]],
   });


  get emailError(): string {
    const control = this.form.controls.email;

    if (!control.touched) return '';
    if (control.hasError('required')) return 'Email is required';
    if (control.hasError('email')) return 'Invalid email address';

    return '';
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.  isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;

      this.router.navigate(['/auth/otp'], {
        queryParams: {
          email: this.form.controls.email.value,
        },
      });
    }, 800);
  }
}
