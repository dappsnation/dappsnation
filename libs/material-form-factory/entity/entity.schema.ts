import { FormGroupSchema } from 'ng-form-factory';

export function matGroup(params: Partial<FormGroupSchema> = {}): FormGroupSchema {
  return {
    form: 'group',
    load: 'group',
    controls: {},
    ...params
  }
}