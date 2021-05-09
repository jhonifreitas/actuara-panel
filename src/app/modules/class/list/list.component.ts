import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Class } from 'src/app/models/class';
import { Page, PageRole } from 'src/app/models/permission';

import { ClassFormComponent } from '../form/form.component';
import { ClassDetailComponent } from '../detail/detail.component';

import { UtilService } from 'src/app/services/util.service';
import { ClassService } from 'src/app/services/firebase/class.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ClassListComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  loading = true;
  filter!: string;
  dataSource!: MatTableDataSource<Class>;
  displayedColumns: string[] = ['id', 'name', 'actions'];

  canAdd = this._permission.check(Page.ClassPage, PageRole.CanAdd);
  canView = this._permission.check(Page.ClassPage, PageRole.CanView);
  canUpdate = this._permission.check(Page.ClassPage, PageRole.CanUpdate);
  canDelete = this._permission.check(Page.ClassPage, PageRole.CanDelete);

  constructor(
    private _util: UtilService,
    private _class: ClassService,
    private _permission: PermissionService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const items = await this._class.getAllActive();
    this.dataSource = new MatTableDataSource<Class>(items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loading = false;
  }

  applyFilter(): void {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  openDetail(object?: Class): void {
    if (this.canView) this._util.detail(ClassDetailComponent, object);
  }

  openForm(object?: Class): void {
    this._util.form(ClassFormComponent, object).then(res => {
      if (res) this.ngOnInit();
    });
  }

  async delete(object: Class): Promise<void> {
    await this._class.delete(object.id);
    this._util.message('Classe excluída com sucesso!', 'success');
    this.ngOnInit();
  }

  confirmDelete(object: Class): void {
    this._util.delete().then(async _ => {
      this.delete(object);
    }).catch(_ => {});
  }
}
