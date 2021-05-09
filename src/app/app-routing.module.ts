import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// GUARD
import { AuthGuard } from './guards/auth.guard';
import { Page, PageRole } from './models/permission';
import { PermissionGuard } from './guards/permission.guard';

// COMPONENT
import { LayoutComponent } from './layout/panel/layout.component';
import { UserListComponent } from './modules/user/list/list.component';
import { GroupListComponent } from './modules/group/list/list.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  { path: '', canActivate: [AuthGuard], component: LayoutComponent, children: [
    { path: 'dashboard', component: DashboardComponent },

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
