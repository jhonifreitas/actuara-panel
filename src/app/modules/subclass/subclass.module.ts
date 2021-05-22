import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MASK
import { MaskPipe } from 'ngx-mask';

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
  ],
  providers: [MaskPipe]
})
export class SubClassModule {}
