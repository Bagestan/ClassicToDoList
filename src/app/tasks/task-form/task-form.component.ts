import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RealtimeService } from 'src/app/services/realtime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VALIDATE_ALL_FORM_FIELDS } from 'src/app/services/utils/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Task } from '../models/model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  form: FormGroup;
  uid: string | null;

  taskId!: string | null;
  task!: Task;

  constructor(
    private fb: FormBuilder,
    private realtimeDB: RealtimeService,
    private auth: AuthService,
    private router: Router,
    private message: NzMessageService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((data: any) => {
      this.taskId = data.id;
      if (this.taskId)
        this.realtimeDB.getTask(this.taskId).subscribe((data: any) => {
          const task: Task = {
            content: data[0],
            done: data[1],
            id: data[2],
            title: data[3],
          };
          this.task = task;
          this.populateForm(task);
        });
    });

    this.uid = this.auth.getUid();

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(40)]],
      content: ['', [Validators.maxLength(210)]],
      done: [false],
      id: [null],
    });
  }

  populateForm(task: Task) {
    this.form.patchValue(task);
  }

  submit() {
    VALIDATE_ALL_FORM_FIELDS(this.form);
    if (this.form.valid) {
      if (this.form.get('id')?.value) {
        this.updateTask();
      } else {
        this.insertTask();
      }
    }
  }

  doneTask(task: Task) {
    task.done = !task.done;
    console.log(task);
    this.realtimeDB.updateTask(task).then(() => this.message.success('Salvo'));
  }

  updateTask() {
    try {
      this.realtimeDB.updateTask(this.form.value).then(
        () => {
          this.successMessage();
          this.router.navigate(['tasks']);
        },
        (error) => console.error(error)
      );
    } catch (error) {
      console.error(error);
    }
  }

  insertTask() {
    try {
      this.realtimeDB.insertTask(this.form.value).then(
        () => {
          this.successMessage();
          this.router.navigate(['tasks']);
        },
        (error) => console.error(error)
      );
      this.router.navigate(['tasks']);
    } catch (error: any) {
      this.message.error(error);
    }
  }

  deleteTask(task: Task) {
    this.realtimeDB.deleteTask(task).then(() => {
      this.successMessage();
      this.router.navigate(['tasks']);
    });
  }

  successMessage() {
    this.message.success('Tarefa salva');
  }

  close() {
    this.router.navigate(['tasks']);
  }
}
