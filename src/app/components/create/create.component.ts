import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  firstName = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.firstName.hasError('required') ? 'Please enter a tea name' : '';
  }

}