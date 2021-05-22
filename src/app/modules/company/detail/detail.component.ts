import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public object: Company,
    private dialogRef: MatDialogRef<CompanyDetailComponent>
  ) { }

  ngOnInit(): void { }

  goToBack(params?: any): void {
    this.dialogRef.close(params);
  }
}
