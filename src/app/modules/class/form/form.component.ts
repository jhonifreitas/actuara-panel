import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Class } from 'src/app/models/class';

import { UtilService } from 'src/app/services/util.service';
import { ClassService } from 'src/app/services/firebase/class.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ClassFormComponent implements OnInit {

  submitting = false;
  formGroup: FormGroup;

  constructor(
    private _util: UtilService,
    private _class: ClassService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Class = new Class()
  ) {
    this.formGroup = this.formBuilder.group({
      id: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.data.id) this.setData();
  }

  setData(): void {
    this.formGroup.patchValue(this.data);
  }

  get controls() {
    return this.formGroup.controls as {
      id: FormControl,
      name: FormControl
    };
  }

  async checkId() {
    const value = this.controls.id.value;
    if (this.controls.id.valid) {
      const obj = await this._class.getById(value).catch(_ => {});
      this.controls.id.setErrors(obj && obj.id !== this.data.id ? {exist: true} : null);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid) {
      this.submitting = true;
      const value = this.formGroup.value;
      Object.assign(this.data, value);

      await this._class.set(this.data.id, this.data);

      this.submitting = false;
      this._util.message('Classe salva com sucesso!', 'success');
      this.dialogRef.close(true);
    } else this._util.message('Verifique os dados antes de salvar!', 'warn');
  }
}
