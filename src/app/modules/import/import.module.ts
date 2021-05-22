import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULE
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { ImportComponent } from './import.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ImportComponent
  ]
})
export class ImportModule {}
