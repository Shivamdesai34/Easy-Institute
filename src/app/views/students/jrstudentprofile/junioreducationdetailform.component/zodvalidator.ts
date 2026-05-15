import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZodTypeAny } from 'zod';

export function zodValidator(schema: ZodTypeAny): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = schema.safeParse(control.value);
    if (!result.success) {
      return { zodError: result.error.errors.map(e => e.message).join(', ') };
    }
    return null;
  };
}
