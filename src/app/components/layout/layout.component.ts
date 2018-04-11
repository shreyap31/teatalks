import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Tea } from '../../models/tea';
import { TeaService } from '../../services/tea.service';
import { UserService } from '../../services/user.service';
import { AppStateService } from '../../services/app.state.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SuscribeComponent } from '../suscribe/suscribe.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private teaService: TeaService,
    private userService: UserService,
    public appStateService: AppStateService,
    private router: Router
  ) {}

  openDialog(): void {
    this.dialog.open(SignInComponent, {
      width: '600px',
      height: '500px',
    });
  }
  openSuscribe(): void {
    let dialogRef = this.dialog.open(SuscribeComponent, {
      width: '370px',
	  height: '210px',
    });
  }

  ngOnInit() {
    const userId = this.appStateService.userId || 'Default';
    this.teaService.getTeaList(userId)
        .subscribe(teaList => {
          this.appStateService.teaList = teaList;
          if (window.location.pathname === '/') {
            this.router.navigateByUrl('/order/' + teaList[0].id);
          }
        });
  }

  onSignOutClick() {
    this.userService.logout().subscribe(() => {
      window.location.assign('/');
    });
  }

  get teaList() {
    return this.appStateService.teaList;
  }

}
