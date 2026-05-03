import { Card } from '@almalhi-frontend/ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [Card],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  stats = [
    {
      title: 'Users',
      value: 1200,
      icon: 'fa-solid fa-users',
      color: '#2F959C',
    },
    {
      title: 'Orders',
      value: 350,
      icon: 'fa-solid fa-cart-shopping',
      color: '#A89333',
    },
    {
      title: 'Revenue',
      value: '$12,500',
      icon: 'fa-solid fa-dollar-sign',
      color: '#1C585C',
    },
  ];

  activities = [
    { title: 'New user registered', time: '2 min ago' },
    { title: 'Order placed', time: '10 min ago' },
    { title: 'Password reset', time: '1 hour ago' },
  ];
}
