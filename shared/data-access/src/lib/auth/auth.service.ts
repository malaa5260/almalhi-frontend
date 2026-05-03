import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest, VerifyOtpRequest } from './types/auth-request.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/auth';

  login(payload: LoginRequest): Observable<void> {
    console.log('login payload', payload);
    return of(void 0).pipe(delay(800));
  }

  register(payload: RegisterRequest): Observable<void> {
    console.log('register payload', payload);
    return of(void 0).pipe(delay(800));
  }

  forgotPassword(payload: ForgotPasswordRequest): Observable<void> {
    console.log('forgot password payload', payload);
    return of(void 0).pipe(delay(800));
  }

  verifyOtp(payload: VerifyOtpRequest): Observable<void> {
    console.log('verify otp payload', payload);
    return of(void 0).pipe(delay(800));
  }

  resetPassword(payload: ResetPasswordRequest): Observable<void> {
    console.log('reset password payload', payload);
    return of(void 0).pipe(delay(800));
  }
}
