import { FormGroup } from '@angular/forms';

export const VALIDATE_ALL_FORM_FIELDS = (form: FormGroup) => {
  Object.values(form.controls).forEach((control) => {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
};
