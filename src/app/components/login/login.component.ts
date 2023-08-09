import { Component, Inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {} // private dialogRef: DialogRef // private formBuilder: FormBuilder, //private router: Router,

  // get formControls() {
  //   return this.authForm.controls;
  // }

  login() {
    // this.isSubmitted = true;
    // if (this.authForm.invalid) {
    //   return;
    // }
    // this.dialogRef.close();
    // this.authService.login(this.authForm.value);
  }
  forgetPass() {
    // if (this.authForm.value.email)
    //   this.authService.forgetPass(this.authForm.value.email);
    // else
    //   this.authService.notify('Please enter your email to recover password!');
  }
}
