import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // Subject and observable for spinner.
  spinner = new BehaviorSubject<boolean>(false);
  spinner$ = this.spinner.asObservable();
  state = false;

  constructor() {}

  /**
   * Function which triggers the subscriber function to show or hide spinner.
   *
   * @param {boolean} state
   * @memberof LoaderService
   */
  setSpinnerState(state: boolean) {
    this.state = state;
    this.spinner.next(state);
  }
}
