import { FormArray } from '@angular/forms';
import { FormArraySchema, GetItem, GetForm, FormOption } from './types';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

type Factory<T> = T extends ((...args: any) => infer I) ? I : T;
type Controls<Schema extends FormArraySchema<any>> = GetForm<Factory<Schema['factory']>>;

/** 
 * Get the factory schema from an FormArraySchema. 
 * @param schema the FormArraySchema to get the factoryschema from
 * @param item the courant item. @required when factory is a function
 */
export function getFactory<T>(schema: FormArraySchema<T>, item?: T) {
  if (typeof schema.factory === 'function') {
    if (!item) {
      throw new Error('You need provide an item when using a factory function in FormArrayShema')
    }
    return schema.factory(item);
  } else {
    return schema.factory;
  }
}

export { Controls as ListContols };

export class FormList<Schema extends FormArraySchema<T>, T = GetItem<Schema>> extends FormArray {
  createControl: (item?: Partial<T>) => Controls<Schema>;
  controls: Controls<Schema>[];
  value: T[];
  valueChanges: Observable<T[]>;
  value$: Observable<T[]>;

  static factory<Schema extends FormArraySchema<T>, T = GetItem<Schema>>(
    schema: Schema,
    initial: T[] = [],
    createControl: (item: Partial<T>) => Controls<Schema>
  ) {
    const controls = initial.map(item => createControl(item));
    const form = new FormList<Schema, T>(schema, controls);
    form.createControl = createControl
    return form;
  }

  constructor(schema: Schema, controls: Controls<Schema>[]) {
    super(controls, schema.validators);
    this.value$ = this.valueChanges.pipe(startWith(this.value))
  }

  push(control: Controls<Schema>) {
    super.push(control);
  }

  at(index: number): Controls<Schema> {
    return super.at(index) as any;
  }

  setControl(index: number, control: Controls<Schema>) {
    super.setControl(index, control);
  }

  patchValue(value: Partial<T>[], options: FormOption = {}) {
    super.patchValue(value, options);
  }

  setValue(value: Partial<T>[], options: FormOption = {}) {
    super.setValue(value, options);
  }

  reset(value: Partial<T>[] = [], options: FormOption = {}) {
    super.reset(value, options);
  }

  /** Create one or several controls */
  add(value?: Partial<T> | Partial<T>[]) {
    if (!this.createControl) {
      throw new Error('Method "add" cannot be used because "createControl" is not defined')
    }
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      super.push(this.createControl(item));
    }
  }
  
  /** Move a form from one index to another if empty */
  move(from: number, to: number) {
    const previous = this.at(to);
    const next = this.at(from);
    this.setControl(to, next);
    previous
      ? this.setControl(from, previous)
      : this.removeAt(from);
  }
}