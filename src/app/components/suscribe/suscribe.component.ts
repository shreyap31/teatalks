import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-suscribe',
  templateUrl: './suscribe.component.html',
  styleUrls: ['./suscribe.component.scss']
})
export class SuscribeComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(public dialogRef: MatDialogRef<SuscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  suscribed()
  {
    alert("You have suscribed successfully!");
   
  }

  ngOnInit() {
  }
  getErrorMessageUsername() {
    return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  closeDialog()
  {
    this.dialogRef.close();
  }
  

}
