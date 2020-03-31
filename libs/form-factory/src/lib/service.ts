import { Injectable, Inject, Optional, Type } from '@angular/core';
import { FormSchema, GetEntity, isArraySchema, isGroupSchema, GetForm, isControlSchema, Factory, Definition, FactoryField } from './types';
import { FormEntity } from './entity';
import { FormControl } from '@angular/forms';
import { FormList, getFactory } from './list';
import { FACTORY } from './tokens';


type GetArrayType<T> = T extends (infer I)[] ? I : never;

@Injectable()
export class FormFactory {
  constructor(@Optional() @Inject(FACTORY) private factory: Factory) {}

  hasKey(key: string, type: 'component' | 'form' | 'schema' | 'state') {
    return this.factory && this.factory[key] && this.factory[key][type];
  }

  /**
   * Create the component associated with the schema
   * @param schema The schema defining the component
   * @param form The form used to create the component
   */
  createComponent<Schema extends FormSchema>(schema: Schema, form: GetForm<Schema>): Promise<Type<any>> {
    if (schema.load) {
      if (typeof schema.load === 'string') {
        if (this.hasKey(schema.load, 'component')) {
          return this.factory[schema.load].component(form);
        } else {
          throw new Error(`Cannot load schema with key ${schema.load} as it's not part of the factory ${this.factory}.`)
        }
      } else if (typeof schema.load === 'function') {
        return schema.load(form);
      } else {
        throw new Error(`Property "load" of schema ${schema} should be either a string or a function.`)
      }
    }
  }

  /**
   * Create all default values to initialize the form
   * @param schema The schema to base the form upon
   * @param initial Initial value
   */
  createState<Schema extends FormSchema, T = GetEntity<Schema>>(schema: Schema, state?: Partial<T>): T {
    if (typeof schema.load === 'string' && this.hasKey(schema.load, 'state')) {
      return this.factory[schema.load].state(state);
    }
    if (isArraySchema(schema)) {
      return schema.controls.map((node, i) => {
        const value = state && state[i];
        return this.createState(node, value);
      }) as any;
    } else if (isGroupSchema(schema)) {
      return Object.keys(schema.controls).reduce((acc, key) => {
        const value = state && state[key];
        acc[key] = this.createState(schema.controls[key], value);
        return acc;
      }, {}) as T;
    } else {
      return state as any;
    }
  }

  /** 
   * Create a Form (FormList, FormEntity, FormField) based on a form schema
   * Will check type recursively and create the right control
   * @param schema Schema of the form
   * @param state The state to initialize the control with
   */
  createForms<Schema extends FormSchema, T = GetEntity<Schema>>(schema: Schema, state?: T): GetForm<Schema> {
    state = this.createState(schema, state);
    if (typeof schema.load === 'string' && this.hasKey(schema.load, 'form')) {
      return this.factory[schema.load].form(state) as any;
    }
    if (isControlSchema(schema)) {
      return new FormControl(state) as any;
    }
    if (isGroupSchema<T>(schema)) {
      const factory = (key: string, content: any) => this.createForms(schema.controls[key], content);
      return FormEntity.factory(schema as any, state, factory as any) as any;
    }
    if (isArraySchema<GetArrayType<T>>(schema)) {
      const factory = (item: GetArrayType<T>) => {
        const factorySchema = getFactory(schema, item);
        return this.createForms(factorySchema, item);
      }
      return FormList.factory(schema as any, state as any, factory as any) as any;
    }
  }

  /**
   * Create a schema based on a definition
   * @param definition an object that describe the data
   */
  createSchema<T extends Factory>(definition: Definition<T>) {
    if (typeof definition === 'string') {
      // Array
      if (definition.slice(-2) === '[]') {
        const def = definition.slice(0, -2);
        if (!this.hasKey(def, 'schema')) {
          throw new Error(`Key ${def} of ${def}[] doesn't exist in factory or no factory provided in FormFactoryModule.forRoot`);
        }
        const factory = this.factory[def].schema();
        return (this.factory['array'] as FactoryField<any[]>).schema({ factory });
      }
      // Control
      if (!this.hasKey(definition, 'schema')) {
        throw new Error(`Key ${definition} doesn't exist in factory or no factory provided in FormFactoryModule.forRoots`);
      }
      return this.factory[definition].schema();
    } else if (typeof definition === 'object') {
      const controls = {};
      for (const key in definition) {
        const value = definition[key]
        controls[key] = this.createSchema(value);
      }
      return this.factory['group'].schema({ controls });
    } else {
      throw new Error(`Definition should either a string or an object. Got ${definition} instead`)
    }
  }

  /**
   * Create a schema based on an objet instance
   */
  createSchemaFromState() {

  }
}
