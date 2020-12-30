import { ProductLaunchComponent } from './product-launch/product-launch.component';
import { PolicyViewComponent } from './policy-view/policy-view.component';
import { MedicalActivityComponent } from './medical-activity/medical-activity.component';
import { ClaimTypeComponent } from './claim-type/claim-type.component';
import { BrokerViewComponent } from './broker-view/broker-view.component';
import { physicalActivityComponent } from './physical-activity/physical-activity.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { EmulatorComponent } from './emulator/emulator.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: "PhysicalActivity", component: physicalActivityComponent},
  { path: "brokerView", component: BrokerViewComponent},
  { path: "claimType", component: ClaimTypeComponent},
  { path: "MedicalActivity", component : MedicalActivityComponent},
  { path: "policyView", component : PolicyViewComponent},
  { path: "productLaunch", component : ProductLaunchComponent},
  { path: "Home", component: HomeComponent},
  { path: "emulator", component: EmulatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
