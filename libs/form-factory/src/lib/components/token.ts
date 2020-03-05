import { InjectionToken, Injector, Type } from '@angular/core';
import { FormSchema, isControlSchema, isGroupSchema, isArraySchema, GetForm } from '../core/types';
import { AbstractControl } from '@angular/forms';

export const FORM = new InjectionToken<AbstractControl>('Form to pass to children form');
export const SCHEMA = new InjectionToken<FormSchema>('Schema to pass to children form');

export const FACTORY = new InjectionToken<FormFactory>('Factory used to generate form component');


export interface FormFactory {
  [key: string]: (form?: AbstractControl) => Promise<Type<any>>;
}

export interface LazyComponent {
  injector: Injector,
  component: Promise<Type<any>>;
}

export function getComponent<Schema extends FormSchema>(
  schema: Schema,
  factory?: FormFactory,
  form?: GetForm<Schema>
) {
  if (schema.load) {
    if (typeof schema.load === 'string') {
      if (schema.load in factory) {
        return factory[schema.load](form);
      } else {
        throw new Error(`Cannot load schema with key ${schema.load} as it's not part of the factory ${factory}.`)
      }
    } else if (typeof schema.load === 'function') {
      return schema.load(form);
    } else {
      throw new Error(`Property "load" of schema ${schema} should be either a string or a function.`)
    }
  } else {
    if (isControlSchema(schema)) {
      return import('./control').then(c => c.ControlBase)
    } else if (isGroupSchema(schema)) {
      return import('./entity').then(c => c.EntityBase)
    } else if (isArraySchema(schema)) {
      return import('./list').then(c => c.ListBase)
    } else {
      throw new Error(`Property "load" of FormArraySchema should be a schema, but got ${schema}`);
    }
  }
}