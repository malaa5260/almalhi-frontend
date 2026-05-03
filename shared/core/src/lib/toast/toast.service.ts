import { Injectable, signal } from '@angular/core';


export type ToastType = 'success' | 'error' | 'info';

export type ToastMessage = { message: string; type: ToastType; id: number; };

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private counter = 0;

  toasts = signal<ToastMessage[]>([]);

  show(message: string, type: ToastType = 'info') {
    const id = ++this.counter;

    this.toasts.update(t => [...t, { message, type, id }]);

    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  remove(id: number) {
    this.toasts.update(t => t.filter(x => x.id !== id));
  }

  success(msg: string) {
    this.show(msg, 'success');
  }

  error(msg: string) {
    this.show(msg, 'error');
  }
}
