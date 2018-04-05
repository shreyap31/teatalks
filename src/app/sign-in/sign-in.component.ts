import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide=true;
  email = new FormControl('', [Validators.required]);
  fname = new FormControl('', [Validators.required]);
  lname = new FormControl('', [Validators.required]);
  password1 = new FormControl('', [Validators.required]);
 
  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() { }	

  getErrorMessageUsername() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('maxLength') ? 'Not a valid length' :
		this.email.hasError('pattern') ? 'Only Alphabets allowed' :
            '';
  }

  getErrorMessagePassword() {
    return this.password1.hasError('required') ? 'You must enter a value' :
		this.password1.hasError('pattern') ? 'Not valid password' :
            '';
  }

  getErrorMessageFname() {
    return this.fname.hasError('required') ? 'You must enter a value' :
		this.fname.hasError('pattern') ? 'Only Alphabets allowed' :
            '';
  }

  getErrorMessageLname() {
    return this.lname.hasError('required') ? 'You must enter a value' :
		this.lname.hasError('pattern') ? 'Only Alphabets allowed' :
            '';
  }
}
