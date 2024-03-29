import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULE
import { SharedModule } from 'src/app/shared/shared.module';

// COMPONENT
import { GroupListComponent } from './list/list.component';
import { GroupFormComponent } from './form/form.component';
import { GroupDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GroupListComponent,
    GroupFormComponent,
    GroupDetailComponent
  ],
  entryComponents: [
    GroupFormComponent,
    GroupDetailComponent
  ]
})
export class GroupModule {}
