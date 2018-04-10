import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { ApiService } from './services/api.service';
import { TeaService } from './services/tea.service';
import { UserService } from './services/user.service';
import { AppStateService } from './services/app.state.service';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OrderComponent, OrderDialogComponent } from './components/order/order.component';
import { CreateComponent } from './components/create/create.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SuscribeComponent, OrderDialogComponentsuscribe } from './components/suscribe/suscribe.component';
import { AuthGuard } from './auth.guard';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    OrderComponent,
    CreateComponent,
    SignInComponent,
    SuscribeComponent,
    OrderDialogComponent,
    OrderDialogComponentsuscribe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [SignInComponent, SuscribeComponent, OrderDialogComponent, OrderDialogComponentsuscribe],
  providers: [
    ApiService,
    TeaService,
    UserService,
    AppStateService,
    CookieService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
