import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Task } from '../models/model';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  uid: string | null;
  tasks: Task[] = [];

  constructor(private auth: AuthService, private db: RealtimeService) {
    this.uid = this.gerUid();

    if (this.uid) {
      this.getUserTasks(this.uid);
    }
  }

  getUserTasks(uid: string) {
    this.db.getUserTasks(uid).subscribe((data) => {
      this.tasks = data as Task[];
    });
  }

  gerUid() {
    return this.auth.getUid();
  }

  signOut() {
    this.auth.signOut();
  }
}
