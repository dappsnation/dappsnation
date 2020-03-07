import { MatFormFieldSchema } from '../form-field/form-field.schema';
import { FormControlSchema } from '../../core';

export interface MatTextSchema extends FormControlSchema, MatFormFieldSchema<string> {}

export function matText(params: Partial<MatTextSchema> = {}): MatTextSchema {
  return {
    form: 'control',
    type: 'text',
    ...params
  }
}