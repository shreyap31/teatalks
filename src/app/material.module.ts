
import { BrowserModule } from '@angular/platform-browser';      
import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common';    
import { FormsModule,ReactiveFormsModule } from '@angular/forms';      
import {      
  MatButtonModule,      
  MatMenuModule,      
  MatToolbarModule,      
  MatIconModule,       
  MatFormFieldModule,      
  MatInputModule,          
  MatRadioModule,      
  MatSelectModule,      
  MatOptionModule,   
  MatCheckboxModule,
  MatTabsModule,
  MatCardModule,
  MatDialogModule,   
  MatGridListModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher      
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';      
import { AppComponent } from './app.component';      
      
@NgModule({        
  imports: [      
    BrowserModule,      
    FormsModule,      
    ReactiveFormsModule,      
    MatButtonModule,      
    MatMenuModule,      
    MatToolbarModule,      
    MatIconModule,           
    BrowserAnimationsModule,      
    MatFormFieldModule,      
    MatInputModule,           
    MatRadioModule,      
    MatSelectModule,      
    MatOptionModule,      
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule
  ],      
  exports: [      
    MatButtonModule,      
    MatMenuModule,      
    MatToolbarModule,      
    MatIconModule,          
    BrowserAnimationsModule,      
    MatFormFieldModule,      
    MatInputModule,          
    MatRadioModule,      
    MatSelectModule,      
    MatOptionModule,      
    MatCheckboxModule,
    MatTabsModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule
  ],      
  providers: [      
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}      
  ],      
  bootstrap: [AppComponent]      
})      
export class MaterialModule { }      

