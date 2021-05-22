import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// DROPZONE
import { NgxDropzoneModule } from 'ngx-dropzone';

// MODULE
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { CompanyListComponent } from './list/list.component';
import { CompanyFormComponent } from './form/form.component';
import { CompanyDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CompanyListComponent,
    CompanyFormComponent,
    CompanyDetailComponent
  ],
  entryComponents: [
    CompanyFormComponent,
    CompanyDetailComponent
  ]
})
export class CompanyModule {}
