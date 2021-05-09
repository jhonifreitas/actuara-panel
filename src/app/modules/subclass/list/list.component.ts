import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { SubClass } from 'src/app/models/class';
import { Page, PageRole } from 'src/app/models/permission';

import { SubClassFormComponent } from '../form/form.component';
import { SubClassDetailComponent } from '../detail/detail.component';

import { UtilService } from 'src/app/services/util.service';
import { PermissionService } from 'src/app/services/permission.service';
import { SubClassService } from 'src/app/services/firebase/subclass.service';

@Component({
  selector: 'app-subclass-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SubClassListComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  loading = true;
  filter!: string;
  dataSource!: MatTableDataSource<SubClass>;
  displayedColumns: string[] = ['id', 'classId', 'name', 'actions'];

  canAdd = this._permission.check(Page.SubClassPage, PageRole.CanAdd);
  canView = this._permission.check(Page.SubClassPage, PageRole.CanView);
  canUpdate = this._permission.check(Page.SubClassPage, PageRole.CanUpdate);
  canDelete = this._permission.check(Page.SubClassPage, PageRole.CanDelete);

  constructor(
    private _util: UtilService,
    private _subclass: SubClassService,
    private _permission: PermissionService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const items = await this._subclass.getAllActive();
    this.dataSource = new MatTableDataSource<SubClass>(items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loading = false;
  }

  applyFilter(): void {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  openDetail(object?: SubClass): void {
    if (this.canView) this._util.detail(SubClassDetailComponent, object);
  }

  openForm(object?: SubClass): void {
    this._util.form(SubClassFormComponent, object).then(res => {
      if (res) this.ngOnInit();
    });
  }

  async delete(object: SubClass): Promise<void> {
    await this._subclass.delete(object.id);
    this._util.message('Subclasse excluída com sucesso!', 'success');
    this.ngOnInit();
  }

  confirmDelete(object: SubClass): void {
    this._util.delete().then(async _ => {
      this.delete(object);
    }).catch(_ => {});
  }
}
