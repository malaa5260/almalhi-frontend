import { ChangeDetectionStrategy, Component } from '@angular/core';

type ActionKind = 'primary' | 'secondary' | 'contact';

type ActionLink = {
  label: string;
  href: string;
  kind: ActionKind;
  icon: string;
  className: string;
};

type AboutHero = {
  title: string;
  summary: string;
  primaryAction: ActionLink;
  secondaryAction: ActionLink;
};

type AudienceItem = {
  title: string;
  description: string;
  icon: string;
};

type CapabilityItem = {
  title: string;
  description: string;
  icon: string;
};

type SupportItem = {
  title: string;
  description: string;
  icon: string;
};

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly hero: AboutHero = {
    title: 'About Almalhi System',
    summary:
      'Almalhi helps visitors and account users understand, enter, and use a protected Angular platform built around reusable frontend foundations and clear dashboard access.',
    primaryAction: {
      label: 'Create Account',
      href: '/auth/register',
      kind: 'primary',
      icon: 'fa-solid fa-user-plus',
      className: 'border-[#2F959C] bg-[#2F959C] text-white hover:bg-[#1C585C]',
    },
    secondaryAction: {
      label: 'Sign In',
      href: '/auth/login',
      kind: 'secondary',
      icon: 'fa-solid fa-right-to-bracket',
      className: 'border-gray-200 bg-white text-[#1C585C] hover:bg-[#2F959C]/10',
    },
  };

  protected readonly audiences: AudienceItem[] = [
    {
      title: 'Visitors',
      description:
        'Learn what the system provides before deciding whether to create an account.',
      icon: 'fa-solid fa-compass',
    },
    {
      title: 'New users',
      description:
        'Find account entry points and understand how registration starts their journey.',
      icon: 'fa-solid fa-user-plus',
    },
    {
      title: 'Existing users',
      description:
        'Return to sign in and continue using the system without losing context.',
      icon: 'fa-solid fa-user-check',
    },
    {
      title: 'Dashboard users',
      description:
        'Use protected dashboard access after authentication keeps private areas guarded.',
      icon: 'fa-solid fa-lock',
    },
  ];

  protected readonly capabilities: CapabilityItem[] = [
    {
      title: 'Account access',
      description:
        'Public entry points guide users toward login and registration when they are ready.',
      icon: 'fa-solid fa-id-card',
    },
    {
      title: 'Protected dashboard',
      description:
        'Dashboard content is reserved for authenticated users through route protection.',
      icon: 'fa-solid fa-shield-halved',
    },
    {
      title: 'Reusable platform',
      description:
        'Shared layout and UI foundations support consistent pages as the system grows.',
      icon: 'fa-solid fa-layer-group',
    },
    {
      title: 'Future workflows',
      description:
        'The structure leaves room for service growth without changing the public About page into a data-entry flow.',
      icon: 'fa-solid fa-seedling',
    },
  ];

  protected readonly supportItems: SupportItem[] = [
    {
      title: 'Account entry',
      description:
        'Users can start from public routes and continue into login or registration when account access is needed.',
      icon: 'fa-solid fa-door-open',
    },
    {
      title: 'Protected access',
      description:
        'The About page is public, while dashboard access remains limited to authenticated users.',
      icon: 'fa-solid fa-user-lock',
    },
    {
      title: 'Dashboard visibility',
      description:
        'Signed-in users can understand that the dashboard is the protected place for private system activity.',
      icon: 'fa-solid fa-chart-line',
    },
    {
      title: 'Service expansion',
      description:
        'Current static guidance explains the system direction without collecting personal information here.',
      icon: 'fa-solid fa-up-right-dots',
    },
  ];

  protected readonly nextActions: ActionLink[] = [
    {
      label: 'Home',
      href: '/home',
      kind: 'secondary',
      icon: 'fa-solid fa-house',
      className: 'border-gray-200 bg-white text-[#1C585C] hover:bg-[#2F959C]/10',
    },
    this.hero.secondaryAction,
    this.hero.primaryAction,
    {
      label: 'Email Support',
      href: 'mailto:support@almalhi.com',
      kind: 'contact',
      icon: 'fa-solid fa-envelope',
      className: 'border-[#1C585C] bg-[#1C585C] text-white hover:bg-[#2F959C]',
    },
  ];
}
