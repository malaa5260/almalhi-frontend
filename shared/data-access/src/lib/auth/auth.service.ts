import { Injectable, signal } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { AuthResponse, ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest, VerifyOtpRequest } from './types/auth-request.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessTokenKey = 'access_token';

  isAuthenticated = signal(!!localStorage.getItem(this.accessTokenKey));

  login(payload: LoginRequest): Observable<AuthResponse> {
    console.log('login payload', payload);

    return of({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    }).pipe(
      delay(800),
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.accessToken);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    this.isAuthenticated.set(false);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
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
