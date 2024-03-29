import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { User } from 'src/app/models/user';
import { FirebaseAbstract } from './abstract';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirebaseAbstract<User> {

  static collectionName = 'users';

  constructor(
    private api: ApiService,
    protected db: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    super(db, UserService.collectionName);
  }

  async add(data: User): Promise<string> {
    return this.api.post('user', data).then(res => res.user.id);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    return this.api.put(`user/${id}`, data);
  }

  uploadImage(id: string, file: Blob | File): Promise<string> {
    return new Promise(resolve => {
      const url = `${UserService.collectionName}/${id}.png`;
      this.afStorage.ref(url).put(file).then(async (res) => {
        resolve(await res.ref.getDownloadURL());
      });
    });
  }

  deleteImage(id: string): Promise<boolean> {
    return new Promise(resolve => {
      const url = `${UserService.collectionName}/${id}.png`;
      this.afStorage.ref(url).delete().subscribe(async _ => {
        await this.update(id, {image: undefined});
        resolve(true);
      });
    });
  }
}
