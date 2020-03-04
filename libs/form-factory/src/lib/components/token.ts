import { InjectionToken, Injector, Type } from '@angular/core';
import { FormSchema, isControlSchema, isGroupSchema, isArraySchema, GetForm } from '../core/types';

export const FORM = new InjectionToken('Form to pass to children form');
export const SCHEMA = new InjectionToken('Schema to pass to children form');

export interface LazyComponent {
  injector: Injector,
  component: Promise<Type<any>>;
}

export function getComponent<Schema extends FormSchema>(
  schema: Schema,
  form?: GetForm<Schema>
) {
  if (schema.load) {
    return schema.load(form);
  } else if (isControlSchema(schema)) {
    return import('./control').then(c => c.ControlBase)
  } else if (isGroupSchema(schema)) {
    return import('./entity').then(c => c.EntityBase)
  } else if (isArraySchema(schema)) {
    return import('./list').then(c => c.ListBase)
  } else {
    throw new Error(`Property "factory" of FormArraySchema should be a schema, but got ${schema}`);
  }
}