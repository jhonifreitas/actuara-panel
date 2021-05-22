import { Base } from './base';

export class Class extends Base {
  name!: string;
}

export class SubClass extends Base {
  type!: 'notRequired' | 'required' | 'depend';
  name!: string;
  classId!: string;
  consemaCodes: string[];

  constructor() {
    super();
    this.consemaCodes = [];
  }

  static get getTypes() {
    return [
      {id: 'depend', name: 'Depende'},
      {id: 'required', name: 'Obrigatório'},
      {id: 'notRequired', name: 'Não obrigatório'}
    ];
  }
}
