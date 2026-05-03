import { Button, Card } from '@almalhi-frontend/ui';
import { ChangeDetectionStrategy, Component, ElementRef, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'lib-otp-verification',
  imports: [RouterLink, Button, Card],
  templateUrl: './otp-verification.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpVerification {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  email = this.route.snapshot.queryParamMap.get('email') || '';
  otp = signal(['', '', '', '']);
  isSubmitting = signal(false);

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 1);
    this.updateOtp(index, value);

    if (value && index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  private updateOtp(index: number, value: string) {
    const otpArray = [...this.otp()];
    otpArray[index] = value;
    this.otp.set(otpArray);
  }


  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otp()[index] && index > 0) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  verify(): void {

    const code = this.otp().join('');

    if (code.length !== 4) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);

      this.router.navigate(['/auth/reset-password'], {
        queryParams: { email: this.email, code },
      });
    }, 800);
  }

}
