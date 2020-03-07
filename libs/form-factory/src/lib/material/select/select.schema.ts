import { FormControlSchema } from '../../core';
import { MatFormFieldSchema } from '../form-field/form-field.schema';

export interface MatSelectSchema<T = any> extends FormControlSchema, MatFormFieldSchema<T> {
  options: T[] | Record<string, T>;
}

export function matSelect(params: Partial<MatSelectSchema> = {}): MatSelectSchema {
  return {
    form: 'control',
    type: 'text',
    options: [],
    ...params
  }
}