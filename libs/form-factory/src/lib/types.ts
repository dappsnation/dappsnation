import { ValidatorFn, FormControl, AbstractControl, FormGroup, FormArray } from "@angular/forms";
import { FormEntity } from './entity';
import { FormList } from './list';
import { Type } from '@angular/core';
import { FormOutlet } from './form-outlet';

export interface FormOption {
  onlySelf?: boolean;
  emitEvent?: boolean;
}

// Schema
export interface FormSchema {
  form: 'group' | 'control' | 'array';
  validators?: ValidatorFn | ValidatorFn[]
  load?: string | ((form?: AbstractControl) => Promise<Type<FormOutlet>>)
}

export interface FormControlSchema extends FormSchema {
  form: 'control',
  load?: string | ((form?: FormControl) => Promise<Type<any>>);
}

export interface FormGroupSchema<T> extends FormSchema {
  form: 'group',
  load?: string | ((form?: FormGroup) => Promise<Type<any>>)
  controls: Partial<{
    [key in Extract<keyof Partial<T>, string>]: GetSchema<T[key]>
  }>
}

export interface FormArraySchema<T = any> extends FormSchema {
  form: 'array',
  load?: string | ((form?: FormArray) => Promise<Type<any>>)
  factory?: FormSchema | ((value: T) => FormSchema);
  controls: FormSchema[],
}

/** Check is a schema is for a FormGroup */
export function isGroupSchema<T = any>(schema: FormSchema): schema is FormGroupSchema<T> {
  return schema.form === 'group';
}

/** Check is a schema is for a FormArray */
export function isArraySchema<T = any>(schema: FormSchema): schema is FormArraySchema<T> {
  return schema.form === 'array';
}

/** Check is a schema is for a FormControl */
export function isControlSchema(schema: FormSchema): schema is FormControlSchema {
  return schema.form === 'control';
}

// GET TYPE 
export type GetSchema<T> =
  T extends string ? FormControlSchema :
  T extends number ? FormControlSchema :
  T extends Function ? FormControlSchema :    // TODO: What to do with Functions ?
  T extends (infer I)[] ? FormArraySchema<I> :
  T extends object ? FormGroupSchema<T> : never;

// GET FORM
export type GetForm<Schema extends FormSchema> = 
  Schema extends FormGroupSchema<infer I> ? FormEntity<Schema, I> :
  Schema extends FormArraySchema<infer Y> ? FormList<Schema, Y> :
  Schema extends FormControlSchema ? FormControl :
  Schema extends FormSchema ? AbstractControl :
  never;

/** Get the entity type of a FormGroupSchema */
export type GetEntity<T> = T extends FormGroupSchema<infer I> ? I : never;

/** Get the type of the array type */
export type GetItem<T> = T extends FormArraySchema<infer I> ? I : never;


