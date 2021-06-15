import { Base } from './base';

export class Consult extends Base {
  company!: Company;
  result: Result;

  constructor() {
    super();
    this.result = new Result();
  }
}

class Company {
  id!: string;
  name!: string;
}

class Result {
  cnpj!: string;
  socialReason!: string;
  mainActivity: Activity;
  secondaryActivities: Activity[];
  status: 'required' | 'notRequired' | 'depend';

  constructor() {
    this.status = 'depend';
    this.secondaryActivities = [];
    this.mainActivity = new Activity();
  }
}

class Activity {
  code!: string;
  text!: string;
  type: 'required' | 'notRequired' | 'depend';

  constructor() {
    this.type = 'depend';
  }
}
