import { Component } from '@angular/core';
import { Spinner2Service } from './components/spinner2/spinner2.service';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-ecommerce-website';
  constructor(
    protected authService: AuthService,
    private spinner2Service: Spinner2Service
  ) {
    if (this.spinner2Service.isLoading) this.isLoading = true;
  }
  isLoading = false;
}
