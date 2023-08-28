import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
// import { MatDialog } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm!: FormGroup;
  isSubmitted = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef,
    private authService: AuthService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  signup() {
    //console.log(this.authForm.value);
    this.isSubmitted = true;
    //console.log('login' + this.authForm.value);
    if (this.authForm.invalid) {
      return;
    }
    //console.log('after login');
    this.dialogRef.close();
    this.authService.signup(this.authForm.value);
    this.router.navigate(['/home']);
  }
}
