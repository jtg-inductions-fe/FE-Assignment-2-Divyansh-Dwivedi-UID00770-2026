import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const specialCharCount = (value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g) || []).length;

    const numericCharCount = (value.match(/[0-9]/g) || []).length;

    const errors: ValidationErrors = {};

    if (specialCharCount < 2) {
      errors['minSpecialCharacters'] = true;
    }

    if (numericCharCount < 2) {
      errors['minNumericCharacters'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
