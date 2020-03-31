import { FormGroup } from '@angular/forms';
import { GetForm, FormGroupSchema, GetEntity, FormOption } from './types';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

type KeyOf<Schema extends FormGroupSchema<any>> = Extract<keyof Schema['controls'], string>;
type ValueOf<Schema extends FormGroupSchema<any>, Key extends KeyOf<Schema>> = Schema['controls'][Key];
type Controls<Schema extends FormGroupSchema<any>> = {
  [key in KeyOf<Schema>]: GetForm<ValueOf<Schema, key>>
}

export { Controls as EntityContols };

export class FormEntity<Schema extends FormGroupSchema<T>, T = GetEntity<Schema>> extends FormGroup {
  controls: Controls<Schema>;
  value: T;
  valueChanges: Observable<T>;
  value$: Observable<T>;

  // Todo : remove "as any"
  static factory<Schema extends FormGroupSchema<T>, T = GetEntity<Schema>>(
    schema: Schema,
    initial: Partial<T> = {},
    createControl: <K extends keyof T>(key: K, value: T[K]) => Controls<Schema>
  ) {
    const controls: Controls<Schema> = {} as any;
    for (const key in initial) {
      if (schema.controls[key]) {
        controls[key as any] = createControl(key, initial[key]);
      }
    }
    const form = new FormEntity(schema as any, controls);
    form.createControl = createControl
    return form;
  }


  constructor(schema: Schema, controls: Controls<Schema>) {
    super(controls, schema.validators);
    this.value$ = this.valueChanges.pipe(startWith(this.value))
  }

  /**
   * Create a control for a specific key of the form
   * @param key A key of the FormEntity
   * @param value The value to initial the control with
   */
  createControl<K extends keyof T>(key: K, value: T[K]): Controls<Schema> {
    const error = `Cannot create key "${key}" of FormEntity. `;
    const why = 'This happens when the FormEntity wasn\'t created with "factory". ';
    const solution = 'Try FormEntity.factory(initial, (key) => ...).';
    throw new Error(error + why + solution);
  }

  get<K extends KeyOf<Schema>>(path: K): GetForm<ValueOf<Schema, K>> {
    return super.get(path) as any;
  }

  addControl<K extends KeyOf<Schema>>(name: K, control: GetForm<ValueOf<Schema, K>>) {
    super.addControl(name, control);
  }

  removeControl(name: KeyOf<Schema>) {
    super.removeControl(name);
  }

  patchValue(value: Partial<T>, options: FormOption = {}) {
    super.patchValue(value, options);
  }

  setValue(value: Partial<T>, options: FormOption = {}) {
    super.setValue(value, options);
  }

  reset(value: Partial<T> = {}, options: FormOption = {}) {
    super.reset(value, options);
  }

  // Todo: remove "as any"
  /** Add a control with to a key with an initial value */
  add<K extends Extract<keyof T, string>>(name: K, value: T[K]) {
    const control = this.createControl(name, value);
    this.addControl(name as any, control as any);
  }

  /** Move a control from one key to another */
  move(from: KeyOf<Schema>, to: KeyOf<Schema>) {
    if (this.get(to)) {
      throw new Error(`Cannot move key ${from} to ${to}, because ${to} already has a control.`);
    }
    const control = this.get(from);
    this.addControl(to, control);
    this.removeControl(from);
  }

  /** Remove all controls */
  clear() {
    for (const key in this.controls) {
      this.removeControl(key as any);
    }
  }
}