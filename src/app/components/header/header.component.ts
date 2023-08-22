import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
// import { PopupService } from '../../shared/services/popup.service';
import { AppUser } from '../../shared/interfaces/app-user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
// import { Router, NavigationStart } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //public appUser!: Boolean;
  //public isAdmin: Boolean = true;
  private destroyed$ = new Subject();
  @Input('appUser') appUser!: { [key: string]: boolean };
  constructor(
    // private popupService: PopupService,

    private authService: AuthService,
    private router: Router,
    private readonly matDialog: MatDialog
  ) {
    // router.events.forEach((event) => {
    //   if (event instanceof NavigationStart) {
    //     setTimeout(() => {
    //       this.appUser = this.authService.isLoggedIn();
    //       console.log(this.appUser);
    //     }, 500);
    //     // this.appUser = this.myfunc();
    //     // console.log(this.appUser);
    //   }
    //   // NavigationEnd
    //   // NavigationCancel
    //   // NavigationError
    //   // RoutesRecognized
    // });
  }

  myfunc() {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {}

  openLoginPopup() {
    //this.popupService.openPopup();
    const dialogRef = this.matDialog.open(LoginComponent, {
      data: {
        /* data to pass to the popup if needed */
      },
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.popupService.closePopup();
    // });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  goTo(view: string, params: number = 0) {
    this.router.navigate([view], { state: { params: params } });
  }
}
