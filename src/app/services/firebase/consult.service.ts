import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { FirebaseAbstract } from './abstract';
import { Consult } from 'src/app/models/consult';

@Injectable({
  providedIn: 'root'
})
export class ConsultService extends FirebaseAbstract<Consult> {

  static collectionName = 'consults';

  constructor(
    protected db: AngularFirestore
  ) {
    super(db, ConsultService.collectionName);
  }
}
