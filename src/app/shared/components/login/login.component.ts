import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { User } from './../../meta/user';
// import { AuthService } from '../../services/auth/auth.service';
// import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
// import { DialogRef } from '@angular/cdk/dialog';
// import { GoogleSigninService } from 'src/app/services/google-signin/google-signin.service';
// import { LinkedinSigninService } from 'src/app/services/linkedin-signin/linkedin-signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() // private router: Router, // private authService: AuthService, // private translate: TranslatePipe, // private dialogRef: DialogRef
  // private formBuilder: FormBuilder // private googleSigninService: GoogleSigninService,
  // private linkedinSigninService: LinkedinSigninService
  {}
  // authForm!: FormGroup;
  // isSubmitted = false;
  ngOnInit(): void {
    // this.authForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
  }
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
