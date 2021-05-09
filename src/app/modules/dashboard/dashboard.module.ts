import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULE
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
