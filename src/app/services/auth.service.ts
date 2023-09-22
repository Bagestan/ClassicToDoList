import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();

  constructor(
    private angularAuth: AngularFireAuth,
    private message: NzMessageService,
    private router: Router
  ) {}

  getUid() {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    }
    return null;
  }

  emailSignIn(email: string, password: string, isPersistence = false) {
    const persistence = isPersistence ? 'session' : 'local';
    this.angularAuth.setPersistence(persistence);
    return from(
      this.angularAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error) =>
        of(this.message.error(`${error.message}`, { nzDuration: 3500 }))
      )
    );
  }

  async signOut() {
    await this.angularAuth.signOut().then(() => this.reditectToSingIn());
  }

  async singUp(email: string, pasword: string): Promise<any> {
    return this.angularAuth.createUserWithEmailAndPassword(email, pasword);
  }

  async logout() {
    await this.angularAuth
      .signOut()
      .then(() => this.router.navigate(['auth/signin']));
  }

  async forgetPassword(email: string): Promise<any> {
    return this.angularAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.message.success(`
        Email de recuperação enviado!  Verifique a caixa de email e o Spam
        `);
        this.reditectToSingIn();
      })
      .catch((error) => {
        this.message.error(error.message);
      });
  }

  reditectToSingIn() {
    this.router.navigate(['/auth', 'signin']);
  }

  signInAnonymously() {
    this.angularAuth.signInAnonymously().then((test) => {
      console.log(test);

      this.router.navigate(['']);
    });
  }
}
