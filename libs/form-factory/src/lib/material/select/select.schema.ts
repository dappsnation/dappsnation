import { Type } from '@angular/core';
import { FormControlSchema } from '../../core';
import { MatFormFieldSchema } from '../form-field/form-field.schema';

export interface MatSelectSchema<T = any> extends FormControlSchema, MatFormFieldSchema<T> {
  options: T[] | Record<string, T>;
  template?: () => Promise<Type<any>>
}

export function matSelect(params: Partial<MatSelectSchema> = {}): MatSelectSchema {
  return {
    form: 'control',
    options: [],
    ...params
  }
}