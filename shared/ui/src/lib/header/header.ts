import { AuthService } from '@almalhi-frontend/data-access';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

type NavItem ={
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'almalhi-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  title = input<string>('Almalhi');

  navItems = input<NavItem[]>([
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Dashboard', path: '/dashboard' },
  ]);

  isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/home']);
  }
}
