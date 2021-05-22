import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MaskPipe } from 'ngx-mask';

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
  types = SubClass.getTypes;

  constructor(
    private mask: MaskPipe,
    private _util: UtilService,
    private _class: ClassService,
    private formBuilder: FormBuilder,
    private _subclass: SubClassService,
    private dialogRef: MatDialogRef<SubClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubClass = new SubClass()
  ) {
    this.formGroup = this.formBuilder.group({
      id: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      type: new FormControl(null, Validators.required),
      classId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      consemaCodes: this.formBuilder.array([]),
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getClasses();
    if (this.data.id) this.setData();
  }

  setData(): void {
    for (const consemaCode of this.data.consemaCodes) this.addConsemaCode(consemaCode);
    this.formGroup.patchValue(this.data);
  }

  get controls() {
    return this.formGroup.controls as {
      id: FormControl,
      type: FormControl
      classId: FormControl,
      description: FormControl,
    };
  }

  get consemaCodeControl() {
    return this.formGroup.get('consemaCodes') as FormArray;
  }

  async getClasses() {
    this.classes = await this._class.getAllActive();
    this.classes.map(item => {
      item.description = `${this.mask.transform(item.id, '00.00-0')} - ${item.description}`;
      return item;
    });
    this.classes = this.classes.sort((a, b) => a.id.localeCompare(b.id));
  }

  addConsemaCode(value?: string) {
    const control = new FormControl(value, Validators.required);
    this.consemaCodeControl.push(control);
  }

  removeConsemaCode(index: number){
    this.consemaCodeControl.removeAt(index);
  }

  async checkId() {
    const value = this.controls.id.value;
    if (this.controls.id.valid) {
      const obj = await this._subclass.getById(value).catch(_ => {});
      this.controls.id.setErrors(obj && obj.id !== this.data.id ? {exist: true} : null);
    }
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
