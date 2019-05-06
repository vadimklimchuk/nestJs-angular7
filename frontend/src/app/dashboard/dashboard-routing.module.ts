import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DashboardRoutingModule { }
