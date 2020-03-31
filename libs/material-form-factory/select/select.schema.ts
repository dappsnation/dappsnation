import { FormControlSchema } from 'ng-form-factory';
import { MatFormFieldSchema } from 'material-form-factory/form-field';
import { Type } from '@angular/core';
import { OptionOutlet } from './option-outlet';

type OptionMap<T> = T extends (infer I)[] 
  ? Partial<Record<Extract<I, string>, any>>
  : Partial<Record<Extract<T, string>, any>>;

export interface MatSelectSchema<T> extends FormControlSchema<T>, MatFormFieldSchema<T> {
  options: OptionMap<T> | T[];
  multiple: boolean,
  optionTemplate?: () => Promise<Type<OptionOutlet<T>>>;
}

export function matSelect<T>(params: Partial<MatSelectSchema<T>> = {}): MatSelectSchema<T> {
  return {
    form: 'control',
    type: 'text',
    load: 'select',
    options: [],
    multiple: false,
    ...params
  }
}