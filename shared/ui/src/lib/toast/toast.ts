import { Component, inject } from '@angular/core';
import { ToastService } from "@almalhi-frontend/core";

@Component({
  selector: 'almalhi-toast',
  imports: [],
  templateUrl: './toast.html',
})
export class Toast {
  toastService = inject(ToastService);

  close(id: number) {
    this.toastService.remove(id);
  }
}
