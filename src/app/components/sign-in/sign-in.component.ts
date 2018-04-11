import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../services/user.service';
import { AppStateService } from '../../services/app.state.service';
import { TeaService } from '../../services/tea.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  ErrorMessage = "";
  ErrorMessage1 = "";
  hide = true;
  username = new FormControl('', [Validators.required]);
  fname = new FormControl('', [Validators.required]);
  lname = new FormControl('', [Validators.required]);
  password1 = new FormControl('', [Validators.required]);

  loginUsername = new FormControl();
  loginPassword = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<SignInComponent>,
    private userService: UserService,
    private teaService: TeaService,
    private appStateService: AppStateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() { }

  onSignInClick() {
    const userId = this.loginUsername.value;
    const password = this.loginPassword.value;
    this.userService.login(userId, password)
      .subscribe(() => {
        this.teaService.getTeaList(this.appStateService.userId)
          .subscribe(teaList => {
            this.appStateService.teaList = teaList;
          });
        this.iconClick();
      },
      err => {
        // TODO - Show login error message
        if(err)
        {
        this.ErrorMessage="Username or password incorrect";
        }
        else{
          this.ErrorMessage="Something went wrong!";
        }
      });
  }

  onSignUpClick() {
    
    const user = {
      userId: this.username.value,
      password: this.password1.value,
      firstName: this.fname.value,
      lastName: this.lname.value
    };
    
    
    this.userService.signup(user)
      .subscribe(() => {
        this.iconClick();
      },
      err => {
        // TODO - Show signup error message
        if(err)
        {
        this.ErrorMessage="User already exist";
        }
        else{
          this.ErrorMessage="Something went wrong!";
        }
        
      });
 
}

  getErrorMessageUsername() {
    return this.username.hasError('required') ? 'You must enter a value' :
      this.username.hasError('maxLength') ? 'Not a valid length' :
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

  iconClick() {
    this.dialogRef.close();
  }
}
