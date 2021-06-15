import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// GUARD
import { AuthGuard } from './guards/auth.guard';
import { Page, PageRole } from './models/permission';
import { PermissionGuard } from './guards/permission.guard';

// COMPONENT
import { LayoutComponent } from './layout/panel/layout.component';
import { ImportComponent } from './modules/import/import.component';
import { UserListComponent } from './modules/user/list/list.component';
import { GroupListComponent } from './modules/group/list/list.component';
import { ClassListComponent } from './modules/class/list/list.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CompanyListComponent } from './modules/company/list/list.component';
import { SubClassListComponent } from './modules/subclass/list/list.component';
import { ReportConsultListComponent } from './modules/report/consult/list/list.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  { path: '', canActivate: [AuthGuard], component: LayoutComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'cnae', children: [
      { path: '', redirectTo: 'classes', pathMatch: 'full' },
      {
        path: 'classes',
        component: ClassListComponent,
        canActivate: [PermissionGuard],
        data: {permissions: [{page: Page.CNAEClassPage, role: PageRole.CanList}]},
      },
      {
        path: 'subclasses',
        component: SubClassListComponent,
        canActivate: [PermissionGuard],
        data: {permissions: [{page: Page.CNAESubClassPage, role: PageRole.CanList}]},
      },
    ] },
    {
      path: 'empresas',
      component: CompanyListComponent,
      canActivate: [PermissionGuard],
      data: {permissions: [{page: Page.CompanyPage, role: PageRole.CanList}]},
    },
    { path: 'relatorio', children: [
      { path: '', redirectTo: 'consultas', pathMatch: 'full' },
      {
        path: 'consultas',
        component: ReportConsultListComponent,
        canActivate: [PermissionGuard],
        data: {permissions: [{page: Page.ReportConsultPage, role: PageRole.CanList}]},
      },
    ] },
    { path: 'importacoes', component: ImportComponent },
    { path: 'administracao', children: [
      {
        path: 'usuarios',
        component: UserListComponent,
        canActivate: [PermissionGuard],
        data: {permissions: [{page: Page.UserPage, role: PageRole.CanList}]},
      },
      {
        path: 'grupos',
        component: GroupListComponent,
        canActivate: [PermissionGuard],
        data: {permissions: [{page: Page.GroupPage, role: PageRole.CanList}]},
      },
    ] }
  ] },

  // ERROR PAGES
  { path: 'error/403', loadChildren: () => import('./modules/error/403/403.module').then( m => m.Error403Module) },
  { path: '**', loadChildren: () => import('./modules/error/404/404.module').then( m => m.Error404Module) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
