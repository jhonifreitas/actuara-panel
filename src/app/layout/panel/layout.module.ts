import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';

// COMPONENT
import { UserModule } from 'src/app/modules/user/user.module';
import { GroupModule } from 'src/app/modules/group/group.module';

// DEFAULT
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { DashboardModule } from 'src/app/modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    UserModule,
    GroupModule,
    RouterModule,
    CommonModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    DashboardModule,
    MatSidenavModule,
  ]
})
export class LayoutPanelModule { }
