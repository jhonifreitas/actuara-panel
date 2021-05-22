import { Base } from './base';

export class Class extends Base {
  description!: string;
}

export class SubClass extends Base {
  classId!: string;
  description!: string;
  consemaCodes: string[];
  type!: 'notRequired' | 'required' | 'depend';

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
