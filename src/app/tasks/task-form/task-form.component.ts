import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RealtimeService } from 'src/app/services/realtime.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  form: FormGroup;
  uid: string | null;

  constructor(
    private fb: FormBuilder,
    private realtimeDB: RealtimeService,
    private auth: AuthService
  ) {
    this.uid = this.gerUid();

    this.form = this.fb.group({
      title: '',
      content: '',
    });
  }

  submit() {
    if (this.form.valid) {
      this.realtimeDB.insert(`tasks/${this.uid}`, this.form.value);
    }
  }

  gerUid() {
    return this.auth.getUid();
  }

  close() {
    console.log('Close');
  }
}
