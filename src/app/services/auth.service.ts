import { Injectable, inject } from '@angular/core';
import { Auth, idToken } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable, Subscription, catchError, from, map, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isPermission = false;

  idTokenSubscription: Subscription = new Subscription();

  constructor(
    private angularAuth: AngularFireAuth,
    private message: NzMessageService,
    private router: Router
  ) {}

  emailSignIn(email: string, password: string, isPersistence = false) {
    const persistence = isPersistence ? 'session' : 'local';
    this.angularAuth.setPersistence(persistence);
    return from(
      this.angularAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      map(
        (userCredential: any) => {
          console.log(userCredential);
        },
        catchError((error) =>
          of(this.message.error(`${error.message}`, { nzDuration: 3500 }))
        )
      )
    );
  }

  async signOut() {
    await this.angularAuth.signOut().then(() => this.router.navigate(['']));
  }

  getIsPermission(): boolean {
    return this.isPermission;
  }
}
