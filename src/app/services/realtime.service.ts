import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  constructor(private db: AngularFireDatabase) {}

  insert(db: string, object: {}) {
    this.db.list(db).push(object);
  }

  getUserTasks(uid: string) {
    return this.db.list(`tasks/${uid}`).valueChanges();
    // .subscribe((data) => {
    //   console.log('🚀 ~ getUserTasks:', data);
    //   return data;
    // });
  }
}
