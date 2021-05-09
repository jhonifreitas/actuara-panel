import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULE
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { SubClassListComponent } from './list/list.component';
import { SubClassFormComponent } from './form/form.component';
import { SubClassDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SubClassListComponent,
    SubClassFormComponent,
    SubClassDetailComponent
  ],
  entryComponents: [
    SubClassFormComponent,
    SubClassDetailComponent
  ]
})
export class SubClassModule {}
