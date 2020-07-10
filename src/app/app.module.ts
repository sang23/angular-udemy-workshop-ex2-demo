import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClinicComponent } from './clinic/clinic.component';
import { CustomerComponent } from './customer/customer.component';
import { PetComponent } from './pet/pet.component';
import { RepairComponent } from './repair/repair.component';
import { MediceenComponent } from './mediceen/mediceen.component';
import { ReportComponent } from './report/report.component';

const appRouter: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'clinic',
    component: ClinicComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'pet',
    component: PetComponent
  },
  {
    path: 'repair',
    component: RepairComponent
  },
  {
    path: 'mediceen',
    component: MediceenComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    DashboardComponent,
    ClinicComponent,
    CustomerComponent,
    PetComponent,
    RepairComponent,
    MediceenComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouter),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
