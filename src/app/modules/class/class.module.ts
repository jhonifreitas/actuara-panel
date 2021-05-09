import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULE
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { ClassListComponent } from './list/list.component';
import { ClassFormComponent } from './form/form.component';
import { ClassDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ClassListComponent,
    ClassFormComponent,
    ClassDetailComponent
  ],
  entryComponents: [
    ClassFormComponent,
    ClassDetailComponent
  ]
})
export class ClassModule {}
