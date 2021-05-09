import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// FLEX
import { FlexLayoutModule } from '@angular/flex-layout';

// MATERIAL
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

// MODULE
import { AuthRoutingModule } from './auth-routing.module';
import { InputFormModule } from 'src/app/shared/components/input-form/input-form.module';

// COMPONENT
import { LoginFormComponent } from './login/login.component';
import { PasswordResetFormComponent } from './password-reset/password-reset.component';
import { ForgotPasswordFormComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    InputFormModule,
    MatButtonModule,
    FlexLayoutModule,
    AuthRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginFormComponent,
    PasswordResetFormComponent,
    ForgotPasswordFormComponent
  ],
})
export class AuthModule {}
