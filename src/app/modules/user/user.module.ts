import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// DROPZONE
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { UserListComponent } from './list/list.component';
import { UserFormComponent } from './form/form.component';
import { UserDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserDetailComponent
  ],
  entryComponents: [
    UserFormComponent,
    UserDetailComponent
  ]
})
export class UserModule {}
