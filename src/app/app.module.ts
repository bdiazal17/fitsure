import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { physicalActivityComponent } from './physical-activity/physical-activity.component';
import { MedicalActivityComponent } from './medical-activity/medical-activity.component';
import { PolicyViewComponent } from './policy-view/policy-view.component';
import { ClaimTypeComponent } from './claim-type/claim-type.component';
import { BrokerViewComponent } from './broker-view/broker-view.component';
import { ProductLaunchComponent } from './product-launch/product-launch.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home/home.component';
import { EmulatorComponent } from './emulator/emulator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    physicalActivityComponent,
    MedicalActivityComponent,
    PolicyViewComponent,
    ClaimTypeComponent,
    BrokerViewComponent,
    ProductLaunchComponent,
    HomeComponent,
    EmulatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
