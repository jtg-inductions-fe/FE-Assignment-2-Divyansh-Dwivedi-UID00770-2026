import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function usernameAlphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(value);

    return isAlphanumeric ? null : { usernameAlphanumeric: true };
  };
}
