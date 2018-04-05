import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { OrderComponent } from './order/order.component';
import { CreateComponent } from './create/create.component';
import { SignInComponent } from './sign-in/sign-in.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    OrderComponent,
    CreateComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [SignInComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
