import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VALIDATE_ALL_FORM_FIELDS } from 'src/app/services/utils/form';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }

  submitForm() {
    VALIDATE_ALL_FORM_FIELDS(this.form);
    if (this.form.valid) {
      const { email } = this.form.getRawValue();
      this.auth.forgetPassword(email);
    }
  }
}
