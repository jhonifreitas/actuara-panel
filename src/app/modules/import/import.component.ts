import { Component } from '@angular/core';

import ClassJson from 'src/assets/json/class.json';
import SubClassJson from 'src/assets/json/sub-class.json';

import { Class, SubClass } from 'src/app/models/class';

import { UtilService } from 'src/app/services/util.service';
import { ClassService } from 'src/app/services/firebase/class.service';
import { SubClassService } from 'src/app/services/firebase/subclass.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {

  percent = 0;
  loading = false;

  constructor(
    private _util: UtilService,
    private _class: ClassService,
    private _subclass: SubClassService,
  ) { }

  async importClasses() {
    this.loading = true;
    this.percent = 0;
    for (let i = 0; i < ClassJson.length; i++) {
      const item = ClassJson[i];
      if (item.id) {
        const obj = Object.assign(new Class(), item);
        await this._class.set(obj.id, obj);
      } else console.log(item);
      this.percent = (i / ClassJson.length) * 100;
    }
    this._util.message('Classes importadas!', 'success');
    this.loading = false;
  }

  async importSubClasses() {
    this.loading = true;
    this.percent = 0;
    for (let i = 0; i < SubClassJson.length; i++) {
      const item = SubClassJson[i];
      if (item.id) {
        const obj: SubClass = Object.assign(new SubClass(), item);
        if (item.consemaCodes) obj.consemaCodes = item.consemaCodes.split(',');
        else obj.consemaCodes = [];
        await this._subclass.set(obj.id, obj);
      } else console.log(item);
      this.percent = (i / SubClassJson.length) * 100;
    }
    this._util.message('SubClasses importadas!', 'success');
    this.loading = false;
  }
}
