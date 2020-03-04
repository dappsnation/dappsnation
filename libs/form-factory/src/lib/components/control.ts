import { Input, Inject, Optional } from '@angular/core';
import { FormControlSchema, isControlSchema } from '../core/types';
import { FORM, SCHEMA } from './token';
import { FormControl } from '@angular/forms';

export class ControlBase {
  private _form: FormControl
  private _schema: FormControlSchema

  @Input()
  set schema(schema: FormControlSchema) {
    if (schema && isControlSchema(schema)) {
      this._schema = schema;
    }
  }
  get schema() {
    return this._schema;
  }

  @Input()
  set form(form: FormControl) {
    if (form) this._form = form;
  }
  get form() {
    return this._form;
  }

  constructor(
    @Optional() @Inject(FORM) form: any,
    @Optional() @Inject(SCHEMA) schema: any,
  ) {
    this.form = form;
    this.schema = schema;
  }

}