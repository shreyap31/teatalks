import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(SignInComponent, {
      width: '370px',
      height: '500px',
    });
  }

  ngOnInit() {
  }

}
