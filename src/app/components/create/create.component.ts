import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeaService } from '../../services/tea.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  teaName = new FormControl('', [Validators.required]);
  milkChecked = true;
  waterChecked: boolean;
  brand: string;
  cupSize= 0;
  sugarChecked = 'true';

  constructor(private teaService:TeaService) { 

  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.teaName.hasError('required') ? 'Please enter a tea name' : '';
  }

  onSubmitTeaForm() {

    console.log('cicked');
    const tea = {
      brand: this.brand,
      createdBy: "Default",
      cupSize: this.cupSize,
      id: "",
      ingredients: [
        "lemon"
      ],
      milk: this.milkChecked,
      name: this.teaName.value,
      sugar: this.sugarChecked === 'true',
      water: this.waterChecked

    }
    console.log('after create object ' + JSON.stringify(tea));
    this.teaService.addTea(tea);
  }

  get createteaForm() {
    if (!this.teaName.value || (!this.milkChecked && !this.waterChecked)) {
      return false;
    }
    return true;
  }
}
