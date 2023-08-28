import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
// import { MatDialog } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
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

    private router: Router // ,private authService: AuthService
  ) {} // private dialogRef: DialogRef // private formBuilder: FormBuilder, //private router: Router,
  authForm!: FormGroup;
  isSubmitted = false;
  // get formControls() {
  //   return this.authForm.controls;
  // }
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
    console.log(this.authForm.value);
    if (this.authForm.invalid) {
      return;
    }
    console.log('after login');
    this.dialogRef.close();
    this.authService.login(this.authForm.value);
    this.router.navigate(['/home']);

    // const collectionName = 'admins'; // Replace with your collection name
    // const documentKey = 'I0XR504wJASePQtej0D3xxXz';
    // // console.log(
    // //   this.firebaseService.getDocumentByKey(collectionName, documentKey)
    // // );

    // this.dialogRef.close();
    // this.router.navigate(['/home']);
    // const ref = this.firebaseService.getAdmin('admin@mailinator.com');
    // console.log(this.firebaseService.getAdmin('admin@mailinator.com'));
    // ref.valueChanges().subscribe((data) => {
    //   this.data2 = data;
    //   console.log(data);
    // });
    //console.log(this.firebaseService.getAll());
  }
  forgetPass() {
    // if (this.authForm.value.email)
    //   this.authService.forgetPass(this.authForm.value.email);
    // else
    //   this.authService.notify('Please enter your email to recover password!');
  }
}
