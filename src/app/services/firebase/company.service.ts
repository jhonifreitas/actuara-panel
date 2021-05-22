import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { FirebaseAbstract } from './abstract';
import { ApiService } from '../api/api.service';
import { Company } from 'src/app/models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends FirebaseAbstract<Company> {

  static collectionName = 'companies';

  constructor(
    private api: ApiService,
    protected db: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    super(db, CompanyService.collectionName);
  }

  async add(data: Company): Promise<string> {
    return this.api.post('company', data).then(res => res.company.id);
  }

  async update(id: string, data: Partial<Company>): Promise<void> {
    return this.api.put(`company/${id}`, data);
  }

  async getByCNPJ(cnpj: string): Promise<Company | null> {
    return this.getWhere('cnpj', '==', cnpj, undefined, undefined, 1).then(docs => {
      return docs.length ? docs[0] : null;
    });
  }

  uploadImage(id: string, file: Blob | File): Promise<string> {
    return new Promise(resolve => {
      const url = `${CompanyService.collectionName}/${id}.png`;
      this.afStorage.ref(url).put(file).then(async (res) => {
        resolve(await res.ref.getDownloadURL());
      });
    });
  }

  deleteImage(id: string): Promise<boolean> {
    return new Promise(resolve => {
      const url = `${CompanyService.collectionName}/${id}.png`;
      this.afStorage.ref(url).delete().subscribe(async _ => {
        await this.update(id, {image: undefined});
        resolve(true);
      });
    });
  }
}
