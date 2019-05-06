import { NgModule } from '@angular/core';

import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    DashboardModule,
    AuthModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
