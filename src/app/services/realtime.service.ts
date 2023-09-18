import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  constructor(private db: AngularFireDatabase) {}

  insert(db: string, object: {}) {
    this.db
      .list(db)
      .push(object)
      .then((result) => {
        console.log(result);
        console.log(result.key);
      });
  }
}
