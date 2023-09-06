import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { IHNotificationService } from 'ih-ng-notification';
import { AbstractControl, ValidatorFn } from '@angular/forms';

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
    private readonly notificationService: IHNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  passwordMatchValidator(
    passwordKey: string,
    confirmPasswordKey: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get(passwordKey)?.value;
      const confirmPassword = control.get(confirmPasswordKey)?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  signup() {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      this.notificationService.error('An error has occurred', '', true, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
      return;
    }
    this.dialogRef.close();
    this.authService.signup(this.authForm.value);
  }
}
