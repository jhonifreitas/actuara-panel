import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULE
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { ReportConsultListComponent } from './list/list.component';
import { ReportConsultDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ReportConsultListComponent,
    ReportConsultDetailComponent
  ],
  entryComponents: [
    ReportConsultDetailComponent
  ]
})
export class ReportConsultModule {}
