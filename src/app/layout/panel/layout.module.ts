import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';

// DEFAULT
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { LayoutPanelRoutingModule } from './layout-routing.module';
import { SidebarModule } from './components/sidebar/sidebar.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    MatSidenavModule,
    LayoutPanelRoutingModule,
  ]
})
export class LayoutPanelModule { }
