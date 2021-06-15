import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Consult } from 'src/app/models/consult';
import { Page, PageRole } from 'src/app/models/permission';

import { ReportConsultDetailComponent } from '../detail/detail.component';

import { UtilService } from 'src/app/services/util.service';
import { PermissionService } from 'src/app/services/permission.service';
import { ConsultService } from 'src/app/services/firebase/consult.service';

@Component({
  selector: 'app-report-consult-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ReportConsultListComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  canView = this._permission.check(Page.ReportConsultPage, PageRole.CanView);

  loading = false;
  filter!: string;
  dataSource!: MatTableDataSource<Consult>;
  displayedColumns: string[] = ['company', 'cnpj', 'status'];

  constructor(
    private _util: UtilService,
    private _consult: ConsultService,
    private _permission: PermissionService,
  ) { }

  async ngOnInit() {
    this.loading = true;
    const items = await this._consult.getAll();
    this.dataSource = new MatTableDataSource<Consult>(items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loading = false;
  }

  applyFilter(): void {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  openDetail(object?: Consult): void {
    if (this.canView) this._util.detail(ReportConsultDetailComponent, object);
  }
}
