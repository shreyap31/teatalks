import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: OrderComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'create', component: CreateComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
