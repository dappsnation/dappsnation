import { InjectionToken, Type } from '@angular/core';
import { FormSchema } from '../core/types';
import { AbstractControl } from '@angular/forms';

export const FORM = new InjectionToken<AbstractControl>('Form to pass to children form');
export const SCHEMA = new InjectionToken<FormSchema>('Schema to pass to children form');

export const FACTORY = new InjectionToken<FormFactory>('Factory used to generate form component');


export interface FormFactory {
  [key: string]: (form?: AbstractControl) => Promise<Type<any>>;
}
