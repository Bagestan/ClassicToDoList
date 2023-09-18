import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  form: FormGroup;
  auth = getAuth();

  constructor(private fb: FormBuilder, private realtimeDB: RealtimeService) {
    this.auth.currentUser?.uid;
    console.log('🚀 ~ this.auth.currentUser?.uid:', this.auth.currentUser?.uid);

    this.form = this.fb.group({
      title: '',
      content: '',
    });
  }

  submit() {
    if (this.form.valid) {
      this.realtimeDB.insert('tasks', this.form.value);
    }
  }

  close() {
    console.log('Close');
  }
}
