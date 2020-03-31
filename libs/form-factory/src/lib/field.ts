import { FormControl } from '@angular/forms';
import { FormControlSchema, FormOption } from './types';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';


export class FormField<T> extends FormControl {
  value: T;
  value$: Observable<T>;
  constructor(schema: FormControlSchema<T>, state: T) {
    super(state, schema.validators, schema.asyncValidators);
    this.value$ = this.valueChanges.pipe(startWith(this.value));
  }

  patchValue(value: Partial<T>, options: FormOption = {}) {
    super.patchValue(value, options);
  }

  setValue(value: Partial<T>, options: FormOption = {}) {
    super.setValue(value, options);
  }

  reset(value: Partial<T> = {}, options: FormOption = {}) {
    super.reset(value, options);
  }
}