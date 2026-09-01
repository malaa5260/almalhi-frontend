import { Card } from '@almalhi-frontend/ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [Card],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  readonly userCount = 5000;

  readonly stats = [
    {
      title: 'Users',
      value: this.userCount,
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

  requestOrdersByYear = [
    { year: 2026, requests: 420, orders: 310 },
    { year: 2025, requests: 980, orders: 760 },
    { year: 2024, requests: 840, orders: 640 },
    { year: 2023, requests: 690, orders: 520 },
  ].map(item => ({
    ...item,
    total: item.requests + item.orders,
  }));

  maxRequestOrdersTotal = Math.max(
    ...this.requestOrdersByYear.map(item => item.total)
  );

  // Mock data for charts
  salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',

        data: [1200, 1900, 3000, 5000, 2000, 3000],
        backgroundColor: '#2F959C',
      },
    ],
  };

  userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Growth',
        data: [200, 400, 600, 800, 1000, 1200],
        backgroundColor: '#A89333',
      },
    ],
  };
}
