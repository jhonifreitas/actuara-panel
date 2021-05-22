import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// FLEX
import { FlexLayoutModule } from '@angular/flex-layout';

// MATERIAL
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

// COMPONENT
import { DeleteComponent } from './delete.component';

@NgModule({
  declarations: [DeleteComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class DeleteModule { }
