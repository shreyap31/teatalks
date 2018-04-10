import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TeaService } from '../../services/tea.service';
import { TeaBrand } from '../../constants/tea-brand';
import { TeaCupSize } from '../../constants/tea-cup-size';
import { TeaIngredient } from '../../constants/tea-ingredient';
import { AppStateService } from '../../services/app.state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  teaName = new FormControl('', [Validators.required]);
  milkChecked = true;
  waterChecked = false;
  sugarChecked = true;
  brand: string;
  cupSize = 2;
  ingredientOptions;
  TeaBrand = TeaBrand;
  TeaCupSize = TeaCupSize;

  constructor(
    private teaService: TeaService,
    private appStateService: AppStateService,
    private router: Router
  ) {
    this.ingredientOptions = Object.keys(TeaIngredient).reduce((acc, key) => {
      acc.push({
        name: TeaIngredient[key],
        checked: false
      });
      return acc;
    }, []);
  }

  ngOnInit() {
  }

  onSubmitTeaForm() {
    const ingredients = [];

    this.ingredientOptions.forEach(ingredient => {
      if (ingredient.checked) {
        ingredients.push(ingredient.name);
      }
    });

    const createdBy = this.appStateService.userId || 'Default';

    const tea = {
      id: '',
      name: this.teaName.value,
      brand: this.brand,
      milk: this.milkChecked,
      sugar: this.sugarChecked,
      water: this.waterChecked,
      cupSize: this.cupSize,
      ingredients,
      createdBy
    };

    this.teaService.addTea(tea).subscribe(res => {
      tea.id = res.id;
      this.appStateService.teaList.push(tea);
      this.router.navigateByUrl('/order/' + tea.id);
    });
  }

  get teaNameErrorMessage() {
    return this.teaName.hasError('required') ? 'please enter a tea name' : null;
  }

  get milkWaterErrorMessage() {
    if (!this.milkChecked && !this.waterChecked) {
      return 'please select at least one option';
    }
    return null;
  }

  get canCreateTea() {
    if (!this.teaName.value || !this.brand || (!this.milkChecked && !this.waterChecked)) {
      return false;
    }
    return true;
  }
}
