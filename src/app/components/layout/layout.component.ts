import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Tea } from '../../models/tea';
import { TeaService } from '../../services/tea.service';
import { AppStateService } from '../../services/app.state.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private teaService: TeaService,
    private appStateService: AppStateService,
    private router: Router
  ) {}

  openDialog(): void {
    this.dialog.open(SignInComponent, {
      width: '600px',
      height: '500px',
    });
  }

  ngOnInit() {
    this.teaService.getTeaList()
        .subscribe(teaList => {
          this.appStateService.teaList = teaList;
          if (window.location.pathname === '/') {
            this.router.navigateByUrl('/order/' + teaList[0].id);
          }
        });
  }

  get teaList() {
    return this.appStateService.teaList;
  }

}
