import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-suscribe',
  templateUrl: './suscribe.component.html',
  styleUrls: ['./suscribe.component.scss']
})
export class SuscribeComponent implements OnInit {
  public flag=true;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(public dialogRef: MatDialogRef<SuscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }

  suscribed()
  {
    if(this.email.invalid)
    {
        
    }
    else
    {
    this.dialogRef.close();
    
    this.dialog.open(OrderDialogComponentsuscribe, {
      width: '400px',
      height: '250px'
    });
    
  }
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
@Component({
  selector: 'app-order',
  templateUrl: './suscribed.component.html'
})
export class OrderDialogComponentsuscribe {

  constructor(public dialogRef: MatDialogRef<OrderDialogComponentsuscribe>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  iconClick() {
    this.dialogRef.close();
  }

}
