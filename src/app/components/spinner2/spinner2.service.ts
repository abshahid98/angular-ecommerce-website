import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Spinner2Service {

  constructor(private spinner: NgxSpinnerService) {}

  isLoading = new Subject<boolean>();
  show() {
    this.isLoading.next(true);
    this.spinner.show();
  }
  hide() {
    this.isLoading.next(false);
    this.spinner.hide();
  }
}
