import { FormControlSchema } from 'ng-form-factory';

export interface MatButtonToggleSchema extends FormControlSchema {
  options?: Record<string, string>;
  icons?: Record<string, string>;
  multiple: boolean
}

export const matButtonToggle = (params: Partial<MatButtonToggleSchema> = {}): MatButtonToggleSchema => {
  return {
    form: 'control',
    options: {},
    icons: {},
    multiple: false,
    load: 'buttonToggle',
    ...params
  }
}
