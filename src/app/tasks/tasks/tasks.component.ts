import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  uid: string | null;

  constructor(private auth: AuthService) {
    this.uid = this.gerUid();
  }

  gerUid() {
    return this.auth.getUid();
  }

  signOut() {
    this.auth.signOut();
  }
}
