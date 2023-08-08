import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    // this.isSubmitted = true;
    // if (this.authForm.invalid) {
    //   return;
    // }
    // this.dialogRef.close();
    // this.authService.login(this.authForm.value);
  }

  goTo(view: string, params: number = 0) {
    this.router.navigate([view], { state: { params: params } });
  }
}
