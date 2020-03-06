import { Input, Injector, Optional, Inject, OnDestroy } from '@angular/core';
import { FormArraySchema, isArraySchema } from '../core/types';
import { FormList, getFactory } from '../core/list';
import { FORM, SCHEMA, getComponent, LazyComponent, FACTORY, FormFactory } from './token';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';


/**
 * The base class for a form list
 * @example <caption>Minimum template to implement</caption>
 * ```html
 * <ng-container *ngFor="let component of components">
 *  <ng-template
 *    [ngComponentOutlet]="component.component | async"
 *    [ngComponentOutletInjector]="component.injector">
 *  </ng-template>
 * </ng-container>
 * ```
 */
export class ListBase<T = any> implements OnDestroy {
  private sub: Subscription;
  private _form: FormList<any>;
  private _schema = new BehaviorSubject<FormArraySchema<any>>(null);
  components: LazyComponent[];

  @Input()
  set schema(schema: FormArraySchema<T>) {
    if (schema && isArraySchema(schema)) {
      this._schema.next(schema);
    }
  }
  get schema() {
    return this._schema.getValue();
  }

  @Input()
  set form(form: FormList<any>) {
    if (form) {
      this._form = form;
      this.creatInjectors(form);
    }
  }
  get form() {
    return this._form;
  }

  constructor(
    @Optional() @Inject(FORM) form: any,
    @Optional() @Inject(SCHEMA) schema: any,
    @Optional() @Inject(FACTORY) private factory: FormFactory,
    private injector: Injector,
  ) {
    this.form = form;
    this.schema = schema;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getInjector(control: any) {
    return Injector.create({
      providers: [
        { provide: FORM, useValue: control },
        { provide: SCHEMA, useValue: this.schema.factory }
      ],
      parent: this.injector
    });
  }

  private creatInjectors(form: FormList<any>) {
    this.sub = combineLatest([
      form.value$,
      this._schema.asObservable()
    ]).pipe(
      filter(([_, schema]) => !!schema),
      distinctUntilChanged(([a], [b]) => a.length === b.length),  // Check only size of value
    ).subscribe(() => {
      // TODO: Check if it we can optimize by reusing same component when factory is not a function
      this.components = this.form.controls.map(control => ({
        injector: this.getInjector(control),
        component: getComponent(getFactory(this.schema, control.value), this.factory, control)
      }))
    });
  }
}
