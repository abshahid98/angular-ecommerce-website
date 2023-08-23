import { Component } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor(public loaderService: LoaderService) {}
}