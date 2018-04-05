import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';
import { TeaService } from '../../services/tea.service';
import { Tea } from '../../models/tea';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  teaList: Tea[];

  constructor(
    public dialog: MatDialog,
    private teaService: TeaService
  ) {}

  openDialog(): void {
    this.dialog.open(SignInComponent, {
      width: '370px',
      height: '500px',
    });
  }

  ngOnInit() {
    this.teaService.getTeaList()
        .subscribe(teaList => this.teaList = teaList);
  }

}
