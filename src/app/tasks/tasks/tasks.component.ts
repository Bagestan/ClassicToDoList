import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Task } from '../models/model';
import { RealtimeService } from 'src/app/services/realtime.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  uid: string | null;
  tasks!: Task[];

  constructor(
    private taskService:TasksService,
    private auth: AuthService,
    private db: RealtimeService,
    private router: Router,
    private message: NzMessageService
  ) {
    this.uid = this.auth.getUid();

    if (this.uid) {
      this.getUserTasks();
    }
  }

  getUserTasks() {
    this.db.getUserTasks().subscribe((data) => {
      this.tasks = data as Task[];
    });
  }

  newTask() {
    this.router.navigate(['tasks', 'form']);
  }

  doneTask(task: Task) {
    task.done = !task.done;
    this.updateTask(task);
  }

  updateTask(task: Task) {
    try {
      this.db.updateTask(task).then(() => this.message.success('Salvo'));
    } catch (error) {
      console.error(error);
    }
  }

  editTask(task: Task) {
    this.router.navigate([`tasks/form/${task.id}`]);
  }
}
