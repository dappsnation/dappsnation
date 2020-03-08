import { MatFormFieldSchema } from 'material-form-factory/form-field';
import { FormControlSchema } from 'ng-form-factory';

export interface MatTextSchema extends FormControlSchema, MatFormFieldSchema<string> {}

export function matText(params: Partial<MatTextSchema> = {}): MatTextSchema {
  return {
    form: 'control',
    type: 'text',
    load: 'text',
    ...params
  }
}