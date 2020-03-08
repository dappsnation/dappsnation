import { FormControlSchema } from 'ng-form-factory';
import { MatFormFieldSchema } from '../form-field/form-field.schema';
import { Type } from '@angular/core';
import { OptionOutlet } from './option-outlet';

export interface MatSelectSchema<T = any> extends FormControlSchema, MatFormFieldSchema<T> {
  options: T[] | Record<string, T>;
  optionTemplate?: () => Promise<Type<OptionOutlet<any>>>;
}

export function matSelect(params: Partial<MatSelectSchema> = {}): MatSelectSchema {
  return {
    form: 'control',
    type: 'text',
    load: 'select',
    options: [],
    ...params
  }
}