import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Task } from '../tasks/models/model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  uid: string | null;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.uid = auth.getUid();
  }

  async insertTask(task: Task) {
    const ref = this.db.database.ref(`tasks/${this.uid}`).push();
    task.id = ref.key;
    console.log('🚀 ~ ref:', ref);

    try {
      return await ref.set(task);
    } catch (error) {
      return console.error(error);
    }
  }

  getUserTasks() {
    return this.db.list(`tasks/${this.uid}`).valueChanges();
  }

  getTask(taskId: string) {
    return this.db.list(`tasks/${this.uid}/${taskId}`).valueChanges();
  }

  async updateTask(task: Task) {
    try {
      return await this.db.database
        .ref(`tasks/${this.uid}/${task.id}`)
        .update(task);
    } catch (error) {
      console.error(error);
    }
  }

   deleteTask(task: Task) {
    if (task.id)
      this.db
        .list('tasks' + this.uid)
        .remove(task.id)
        .catch((error) => console.error(error));
  }
}
