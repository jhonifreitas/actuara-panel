import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Page, PageRole } from 'src/app/models/permission';
import { StorageService } from 'src/app/services/storage.service';
import { PermissionService } from 'src/app/services/permission.service';

interface MenuItem {
  title: string;
  url?: string;
  icon: string;
  hidden: boolean;
  permission?: {
    page: Page;
    role: PageRole;
  };
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  menuItems: MenuItem[] = [
    { title: 'Cnae', icon: 'pin', hidden: false, subItems: [
      { title: 'Classes', url: 'cnae/classes', icon: 'filter_1', hidden: false, permission: {
        page: Page.CNAEClassPage, role: PageRole.CanList}
      },
      { title: 'SubClasses', url: 'cnae/subclasses', icon: 'filter_2', hidden: false, permission: {
        page: Page.CNAESubClassPage, role: PageRole.CanList}
      },
    ]},
    { title: 'Escritórios', url: 'empresas', icon: 'business', hidden: false, permission: {
      page: Page.CompanyPage, role: PageRole.CanList}
    },
    { title: 'Relatórios', icon: 'receipt_long', hidden: false, subItems: [
      { title: 'Consultas', url: 'relatorio/consultas', icon: 'http', hidden: false, permission: {
        page: Page.ReportConsultPage, role: PageRole.CanList}
      }
    ]},
    { title: 'Administrações', icon: 'verified_user', hidden: false, subItems: [
      { title: 'Usuários', url: '/administracao/usuarios', icon: 'person', hidden: false, permission: {
        page: Page.UserPage, role: PageRole.CanList}
      },
      { title: 'Grupos', url: '/administracao/grupos', icon: 'group', hidden: false, permission: {
        page: Page.GroupPage, role: PageRole.CanList}
      },
    ]},
  ];

  constructor(
    public _storage: StorageService,
    private _permission: PermissionService
  ) { }

  ngOnInit(): void {
    const interval = setInterval(() => {
      if (this._storage.getUser) {
        clearInterval(interval);
        for (const item of this.menuItems) {
          item.hidden = !this.hasPermission(item);
          if (item.subItems) for (const subItem of item.subItems) subItem.hidden = !this.hasPermission(subItem);
        }
      }
    }, 500);
  }

  closeSideBar(): void {
    const width = window.innerWidth;
    if (width <= 960 && !this.toggleSideBarForMe.closed) {
      this.toggleSideBarForMe.emit();
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    }
  }

  hasPermission(item: MenuItem): boolean {
    if (item.subItems) {
      for (const subItem of item.subItems)
        if (subItem.permission && this._permission.check(subItem.permission.page, subItem.permission.role)) return true;
      return false;
    } else if (item.permission) return this._permission.check(item.permission.page, item.permission.role);
    else return false;
  }
}
