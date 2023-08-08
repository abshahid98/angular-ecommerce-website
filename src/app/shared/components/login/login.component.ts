import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef
  ) {}
  // authForm!: FormGroup;
  isSubmitted = false;
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
