import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../shared/components/login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private readonly matDialog: MatDialog) {}

  ngOnInit(): void {}

  openLoginPopup() {
    this.matDialog.open(LoginComponent, {
      panelClass: 'login-dialog-container',
    });
  }

  goTo(view: string, params: number = 0) {
    this.router.navigate([view], { state: { params: params } });
  }
}
