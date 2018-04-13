import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeaService } from '../../services/tea.service';
import { AppStateService } from '../../services/app.state.service';
import { Tea } from '../../models/tea';
import { TeaCupSize } from '../../constants/tea-cup-size';

@Component({
  selector: 'app-order',
  templateUrl: './order-placed.component.html'
})
export class OrderDialogComponent {

  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  iconClick() {
    this.dialogRef.close();
  }

}

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
    private appStateService: AppStateService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    const teaId = this.route.snapshot.paramMap.get('id');
    if (teaId) {
      const userId = this.appStateService.userId || 'Default';
      this.teaService.getTea(teaId, userId)
        .subscribe(tea => {

          if (tea && tea.name) {
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
  }

  get milkWaterErrorMessage() {
    if (!this.milkChecked && !this.waterChecked) {
      this.canPlaceOrder = false;
      return 'please select at least one option';
    }
    this.canPlaceOrder = true;
    return null;
  }

  openOrderDialog() {
    this.dialog.open(OrderDialogComponent, {
      width: '400px',
      height: '250px'
    });
  }

}
