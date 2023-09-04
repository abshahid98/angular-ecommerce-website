import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  data2: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: DialogRef,
    private authService: AuthService,
    private router: Router
  ) {}
  authForm!: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.authForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.dialogRef.close();
    this.authService.login(this.authForm.value);
  }

  forgetPass() {}
}
