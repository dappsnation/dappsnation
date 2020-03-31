import { ValidatorFn, FormControl, AbstractControl, FormGroup, FormArray, AsyncValidatorFn } from "@angular/forms";
import { FormEntity } from './entity';
import { FormList } from './list';
import { FormField } from './field';
import { Type } from '@angular/core';

export type Definition<T extends Factory> = Record<string, keyof T> | keyof T;

export type Factory<R extends Record<string, any> = any> = {
  [key in keyof R]: Partial<FactoryField<R[key]>>
}

export interface FactoryField<T> {
  component: (params?: AbstractControl) => Promise<Type<FormOutlet>>;
  form: (params?: Partial<T>) => GetForm<GetSchema<T>>;
  schema: (params?: Partial<GetSchema<T>>) => GetSchema<T>;
  state: (params?: Partial<T>) => T
}

export interface FormOutlet {
  form: AbstractControl;
  schema: FormSchema;
}

export interface FormOption {
  onlySelf?: boolean;
  emitEvent?: boolean;
}

// Schema
export interface FormSchema {
  form: 'group' | 'control' | 'array';
  load: string | ((form?: AbstractControl) => Promise<Type<FormOutlet>>)
  validators?: ValidatorFn | ValidatorFn[]
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[]
}


export interface FormControlSchema<T = any> extends FormSchema {
  form: 'control',
  load: string | ((form?: FormControl | FormField<T>) => Promise<Type<any>>); // Need to use generic or it's removed by typecript
}

export interface FormGroupSchema<T = any> extends FormSchema {
  form: 'group',
  load: string | ((form?: FormGroup) => Promise<Type<any>>)
  controls: Partial<{
    [key in Extract<keyof Partial<T>, string>]: GetSchema<T[key]>
  }>
}

export interface FormArraySchema<T = any> extends FormSchema {
  form: 'array',
  load: string | ((form?: FormArray) => Promise<Type<any>>)
  factory: GetSchema<T> | ((value: T) => GetSchema<T>);
  controls: GetSchema<T>[],
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

// GET TYPE OF SCHEMA 
export type GetSchema<T> =
  T extends string ? FormControlSchema<T> :
  T extends number ? FormControlSchema<T> :
  T extends Function ? FormControlSchema :    // TODO: What to do with Functions ?
  T extends (infer I)[] ? FormArraySchema<I> :  // TODO: What if we want a FormControlSchema<I[]>
  T extends object ? FormGroupSchema<T> : never; // TODO: What if we want a FormControlSchema<T>

// GET FORM
export type GetForm<Schema extends FormSchema> = 
  Schema extends FormGroupSchema<infer I> ? FormEntity<Schema, I> :
  Schema extends FormArraySchema<infer J> ? FormList<Schema, J> :
  Schema extends FormControlSchema<infer Y> ? FormField<Y> :
  Schema extends FormSchema ? AbstractControl :
  never;

/** Get type of the state of the schema */
export type GetStateType<Schema> = 
  Schema extends FormGroupSchema<infer I> ? I :
  Schema extends FormArraySchema<infer J> ? J :
  Schema extends FormControlSchema<infer Y> ? Y : never;

/** Get the entity type of a FormGroupSchema */
export type GetEntity<T> = T extends FormGroupSchema<infer I> ? I : never;

/** Get the type of the array type */
export type GetItem<T> = T extends FormArraySchema<infer I> ? I : never;


