import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Consult } from 'src/app/models/consult';

@Component({
  selector: 'app-report-consult-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ReportConsultDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public object: Consult,
    private dialogRef: MatDialogRef<ReportConsultDetailComponent>
  ) { }

  ngOnInit(): void { }

  goToBack(params?: any): void {
    this.dialogRef.close(params);
  }
}
