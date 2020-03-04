import { FormSchema, FormGroupSchema, isControlSchema, isGroupSchema, isArraySchema } from "./types";
import { GetEntity, FormArraySchema, GetItem } from './types';
import { FormControl } from '@angular/forms';
import { FormEntity, EntityContols } from './entity';
import { FormList, getFactory } from './list';

/** 
 * Create a Form (FormList, FormEntity, FormField) based on a form schema
 * Will check type recursively and create the right control
 * @param schema Schema of the form
 * @param value The value to initialize the control with
 */
export function createForms<Schema extends FormSchema>(schema: Schema, value: any) {
  if (isControlSchema(schema)) {
    return new FormControl(value);
  }
  if (isGroupSchema(schema)) {
    const factory = (key: string, content: any) => createForms(schema.controls[key], content);
    return FormEntity.factory(schema, value, factory as any);
  }
  if (isArraySchema(schema)) {
    const factory = (item: any) => {
      const factorySchema = getFactory(schema, item)
      return createForms(factorySchema, item);
    }
    return FormList.factory(schema, value, factory);
  }
}

/**
 * Create an object with controls for a FormGroup
 * @param FormScschemahema Schema for a FormGroup
 * @param entity The object to initialize the control with
 */
export function createEntityControls<Schema extends FormGroupSchema<T>, T = GetEntity<Schema>>(schema: Schema, group: Partial<T>): EntityContols<Schema> {
  if (schema.form !== 'group') {
    throw new Error('Cannot create a Form Entity if type is not "group"');
  }
  const controls = {};
  for (const key in schema.controls) {
    controls[key] = createForms(schema.controls[key], group[key])
  }
  return controls as EntityContols<Schema>;
}

/**
 * Creat an array with controls for a FromArray
 * @param schema Schema for a FormArray
 * @param array The array to initialize the control with
 */
export function createListControls<Schema extends FormArraySchema<T>, T = GetItem<Schema>>(schema: Schema, array: T[]) {
  if (schema.form !== 'array') {
    throw new Error('Cannot create an Form List if type is not "array"');
  }
  return array.map(item => {
    const factory = getFactory(schema, item);
    createForms(factory, item)
  });
}