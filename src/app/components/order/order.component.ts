import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeaService } from '../../services/tea.service';
import { Tea } from '../../models/tea';
import { TeaCupSize } from '../../constants/tea-cup-size';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  // model
  tea: Tea;

  // view models
  milkChecked: boolean;
  waterChecked: boolean;
  sugarChecked: boolean;
  cupSize: number;
  ingredients: string;
  cupSelections = Array(25);
  cupsCount = 1;
  canPlaceOrder = true;
  TeaCupSize = TeaCupSize;

  constructor(
    private teaService: TeaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    const teaId = this.route.snapshot.paramMap.get('id');
    this.teaService.getTea(teaId)
      .subscribe(tea => {

        if (tea) {
          this.tea = tea;

          this.milkChecked = tea.milk;
          this.waterChecked = tea.water;
          if (!this.milkChecked && !this.waterChecked) {
            this.milkChecked = true;
          }

          this.sugarChecked = tea.sugar;

          if ([TeaCupSize.SMALL, TeaCupSize.MEDIUM, TeaCupSize.LARGE].includes(tea.cupSize)) {
            this.cupSize = tea.cupSize;
          } else {
            this.cupSize = TeaCupSize.MEDIUM;
          }

          if (tea.ingredients && tea.ingredients.length) {
            this.ingredients = tea.ingredients.join(', ');
          }
        }
      });
  }

  get milkWaterErrorMessage() {
    if (!this.milkChecked && !this.waterChecked) {
      this.canPlaceOrder = false;
      return 'please select at least one option';
    }
    this.canPlaceOrder = true;
    return null;
  }

}
