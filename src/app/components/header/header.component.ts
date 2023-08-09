import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
// import { PopupService } from '../../shared/services/popup.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    // private popupService: PopupService,
    private router: Router,
    private readonly matDialog: MatDialog
  ) {}

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

  goTo(view: string, params: number = 0) {
    this.router.navigate([view], { state: { params: params } });
  }
}
