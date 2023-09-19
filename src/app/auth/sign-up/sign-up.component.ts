import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { VALIDATE_ALL_FORM_FIELDS } from 'src/app/services/utils/form';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  form: FormGroup;
  passwordVisible = false;
  checkPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private message: NzMessageService
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      checkPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          FormValidations.equalsTo('password'),
        ],
      ],
    });
  }

  submitForm() {
    VALIDATE_ALL_FORM_FIELDS(this.form);
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this.auth
        .singUp(email, password)
        .then((result) => {
          this.message.success(`Usuário ${email} criado com sucesso`, {
            nzDuration: 2500,
          }).onClose!;
          console.log('🚀 ~ result:', result);
        })
        .catch((error) => {
          this.form.setValue({
            email: email,
            password: null,
            checkPassword: null,
          });
          this.message.error(error.message, { nzDuration: 5000 }).onClose!;
        });
    }
  }
}

export class FormValidations {
  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };
    return validator;
  }
}
