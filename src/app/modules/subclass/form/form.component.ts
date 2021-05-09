import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { FormArray } from 'src/app/interfaces/form';
import { Class, SubClass } from 'src/app/models/class';

import { UtilService } from 'src/app/services/util.service';
import { ClassService } from 'src/app/services/firebase/class.service';
import { SubClassService } from 'src/app/services/firebase/subclass.service';

@Component({
  selector: 'app-subclass-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class SubClassFormComponent implements OnInit {

  submitting = false;
  formGroup: FormGroup;
  classes: Class[] = [];

  constructor(
    private _util: UtilService,
    private _class: ClassService,
    private formBuilder: FormBuilder,
    private _subclass: SubClassService,
    @Inject(MAT_DIALOG_DATA) public data = new SubClass(),
    private dialogRef: MatDialogRef<SubClassFormComponent>
  ) {
    this.formGroup = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      classId: new FormControl('', Validators.required),
      consemaCodes: this.formBuilder.array([]),
      required: new FormControl(false),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getClasses();
    if (this.data.id) this.setData();
  }

  setData(): void {
    this.formGroup.patchValue(this.data);
  }

  get controls() {
    return this.formGroup.controls as {
      id: FormControl,
      name: FormControl,
      classId: FormControl,
      required: FormControl
    };
  }

  get consemaCodeControl() {
    return this.formGroup.get('consemaCodes') as FormArray;
  }

  async getClasses() {
    this.classes = await this._class.getAllActive();
  }

  addConsemaCode(value?: string) {
    const control = new FormControl(value, Validators.required);
    this.consemaCodeControl.push(control);
  }

  removeConsemaCode(index: number){
    this.consemaCodeControl.removeAt(index);
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid) {
      this.submitting = true;
      const value = this.formGroup.value;
      Object.assign(this.data, value);

      await this._subclass.set(this.data.id, this.data);

      this.submitting = false;
      this._util.message('Subclasse salva com sucesso!', 'success');
      this.dialogRef.close(true);
    } else this._util.message('Verifique os dados antes de salvar!', 'warn');
  }
}
