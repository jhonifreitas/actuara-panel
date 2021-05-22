import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { Company } from 'src/app/models/company';
import { City } from 'src/app/models/default/city';
import { State } from 'src/app/models/default/state';
import { FileUpload } from 'src/app/interfaces/base';

import { UtilService } from 'src/app/services/util.service';
import { CustomValidator } from 'src/app/services/validator.service';
import { ZipcodeService } from 'src/app/services/api/zipcode.service';
import { CompanyService } from 'src/app/services/firebase/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  togglePass = true;
  states = State.all;
  submitting = false;
  image?: FileUpload;
  cities: City[] = [];
  formGroup: FormGroup;

  constructor(
    private _util: UtilService,
    private _zipcode: ZipcodeService,
    private _company: CompanyService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company = new Company()
  ) {
    this.formGroup = this.formBuilder.group({
      partner: new FormControl(false),
      name: new FormControl('', Validators.required),
      id: new FormControl('', [Validators.required, CustomValidator.CNPJ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: this.formBuilder.group({
        state: new FormControl(''),
        street: new FormControl(''),
        number: new FormControl(''),
        zipcode: new FormControl(''),
        district: new FormControl(''),
        complement: new FormControl(''),
        city: new FormControl({value: '', disabled: true})
      }),
      password: new FormControl(''),
      confirmPass: new FormControl(''),
    }, {validators: !this.data.id ? this.validatorPassword : null});
  }

  ngOnInit(): void {
    if (this.data.id) this.setData();
    else {
      this.controls.password.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[0-9]/),
        Validators.pattern(/[a-zA-Z]/),
        Validators.pattern(/[!@#$%&*()_=+;:,.?><\-]/)
      ]);
      this.controls.confirmPass.setValidators(Validators.required);
      this.controls.password.updateValueAndValidity();
      this.controls.confirmPass.updateValueAndValidity();
    }
  }

  setData(): void {
    if (this.data.image) this.image = {path: this.data.image, new: false};
    this.formGroup.patchValue(this.data);
  }

  get controls() {
    return this.formGroup.controls as {
      id: FormControl,
      name: FormControl,
      email: FormControl,
      partner: FormControl,
      password: FormControl,
      confirmPass: FormControl,
      address: FormGroup
    };
  }

  get addressControls() {
    return this.controls.address.controls as {
      city: FormControl,
      state: FormControl,
      street: FormControl,
      number: FormControl,
      zipcode: FormControl,
      district: FormControl,
      complement: FormControl
    };
  }

  validatorPassword(control: AbstractControl): null {
    const passwordControl = control.get('password');
    const confirmControl = control.get('confirmPass');
    if (passwordControl && confirmControl) {
      let result: {
        required?: boolean;
        passNotSame?: boolean;
        minlength?: {actualLength: number; requiredLength: number};
      } | null = null;

      if (confirmControl.hasError('required')) result = {required: true};
      else if (passwordControl.value !== confirmControl.value) result = {passNotSame: true};

      confirmControl.setErrors(result);
    }
    return null;
  }

  async checkId() {
    const value = this.controls.id.value;
    if (this.controls.id.valid) {
      const obj = await this._company.getById(value).catch(_ => {});
      this.controls.id.setErrors(obj && obj.id !== this.data.id ? {exist: true} : null);
    }
  }

  zipcodeChange() {
    const value: string = this.addressControls.zipcode.value;
    if (value.length === 8)
      this._zipcode.get(value).then(res => {
        this.addressControls.state.setValue(res.uf);
        this.stateChange();
        this.addressControls.district.setValue(res.bairro);
        this.addressControls.city.setValue(res.localidade);
        this.addressControls.street.setValue(res.logradouro);
        if (res.complemento) this.addressControls.complement.setValue(res.complemento);
      }).catch(_ => {});
  }

  stateChange() {
    this.cities = new City().getByState(this.addressControls.state.value);
    if (this.cities.length) this.addressControls.city.enable();
    else this.addressControls.city.disable();
  }

  async takeImage(event: any): Promise<void> {
    const loader = this._util.loading('Comprimindo imagem...');
    const image = await this._util.uploadImage(event.addedFiles[0]);
    const compress = await this._util.uploadCompress(image.path);
    this.image = {path: compress.base64, file: compress.file, new: true};
    loader.componentInstance.msg = 'Imagem comprimida!';
    loader.componentInstance.done();
  }

  async deleteImage(): Promise<void> {
    if (this.image && !this.image.new)
      this._util.delete().then(async _ => {
        await this._company.deleteImage(this.data.id);
        this.image = undefined;
      }).catch(_ => {});
    else this.image = undefined;
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid) {
      this.submitting = true;
      const value = this.formGroup.value;
      delete value.confirmPass;
      Object.assign(this.data, value);

      await this._company.set(this.data.id, this.data);

      this.submitting = false;
      this._util.message('Empresa salva com sucesso!', 'success');
      this.dialogRef.close(true);
    } else this._util.message('Verifique os dados antes de salvar!', 'warn');
  }
}
