import { FormArraySchema } from 'ng-form-factory';

export function matArray(params: Partial<FormArraySchema> = {}): FormArraySchema {
  return {
    form: 'array',
    load: 'array',
    factory: { form: 'control', load: 'text' },
    controls: [],
    ...params
  }
}