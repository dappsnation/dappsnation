import { Component, NgModule, Injector, Inject, Optional, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { ControlBase } from './control';
import { EntityBase } from './entity';
import { ListBase } from './list';
import { getComponent, FORM, SCHEMA } from './token';
import { FormSchema } from '../core/types';

@Component({
  selector: 'form-loader',
  template: `
    <ng-container *ngIf="component">
      <ng-template
        [ngComponentOutlet]="component | async"
        [ngComponentOutletInjector]="injector">
      </ng-template>
    </ng-container>
  `,
})
export class LoaderComponent {
  private _form: AbstractControl;
  private _schema: FormSchema;
  component: Promise<typeof ControlBase | typeof EntityBase | typeof ListBase>
  injector: Injector;

  @Input()
  set schema(schema: FormSchema) {
    if (schema) {
      this._schema = schema;
      this.createInjectors();
    }
  }
  get schema() {
    return this._schema;
  }

  @Input()
  set form(form: AbstractControl) {
    if (form) {
      this._form = form;
      this.createInjectors();
    }
  }
  get form() {
    return this._form;
  }

  constructor(
    @Optional() @Inject(FORM) form: AbstractControl,
    @Optional() @Inject(SCHEMA) schema: any,
    private parentInjector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    this.form = form;
    this.schema = schema;
  }

  private createInjectors() {
    if (this.form && this.schema) {
      this.component = getComponent(this.schema, this.form);
      this.injector = Injector.create({
        providers: [
          { provide: FORM, useValue: this.form },
          { provide: SCHEMA, useValue: this.schema }
        ],
        parent: this.parentInjector
      })
      this.cdr.markForCheck();
    }
  }

}

@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  imports: [
    CommonModule
  ]
})
export class FormLoaderModule { }