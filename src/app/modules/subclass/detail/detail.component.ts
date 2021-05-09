import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SubClass } from 'src/app/models/class';

@Component({
  selector: 'app-subclass-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class SubClassDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public object: SubClass,
    private dialogRef: MatDialogRef<SubClassDetailComponent>
  ) { }

  ngOnInit(): void { }

  goToBack(params?: any): void {
    this.dialogRef.close(params);
  }
}
