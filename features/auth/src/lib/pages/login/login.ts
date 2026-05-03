import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button, Card, Input } from '@almalhi-frontend/ui';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@almalhi-frontend/data-access';
import { finalize } from 'rxjs';
import { ToastService } from '@almalhi-frontend/core';
@Component({
  selector: 'lib-login',
  imports: [ReactiveFormsModule, RouterLink, Button, Card, Input],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private toast = inject(ToastService);
  private router = inject(Router);

  isSubmitting = signal(false);


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
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.isSubmitting.set(true);

    const payload = this.form.getRawValue();
    this.authService.login(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.toast.success('Login successful');
          this.router.navigate(['/home']);
        },
        error: error => {
          this.toast.error('Invalid email or password');
        },
      });
  }
}
