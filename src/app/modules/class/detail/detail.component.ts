import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Class } from 'src/app/models/class';

@Component({
  selector: 'app-class-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ClassDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public object: Class,
    private dialogRef: MatDialogRef<ClassDetailComponent>
  ) { }

  ngOnInit(): void { }

  goToBack(params?: any): void {
    this.dialogRef.close(params);
  }
}
