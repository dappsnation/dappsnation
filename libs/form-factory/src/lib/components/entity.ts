import { Input, Optional, Inject, Injector, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroupSchema, isGroupSchema } from '../core/types';
import { FormEntity } from '../core/entity';
import { FORM, SCHEMA, getComponent, LazyComponent } from './token';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, filter } from 'rxjs/operators';

/**
 * Base class for Entity form component
 * @example <caption></caption>
 * ```html
 * <ng-container *ngFor="let component of components | keyvalue">
 *   <ng-template
 *     [ngComponentOutlet]="component.value.component | async"
 *     [ngComponentOutletInjector]="component.value.injector"
 *   ></ng-template>
 * </ng-container>
 * ```
 */
export class EntityBase<T = any> implements OnDestroy {
  private sub: Subscription;
  private _form: FormEntity<any>
  private _schema = new BehaviorSubject<FormGroupSchema<any>>(null);
  injectors: Record<string, Injector>;
  components: Record<string, LazyComponent> = {};

  @Input()
  set schema(schema: FormGroupSchema<any>) {
    if (schema && isGroupSchema(schema)) {
      this._schema.next(schema);
    }
  }
  get schema() {
    return this._schema.getValue();
  }

  @Input()
  set form(form: FormEntity<any>) {
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
    private injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    this.form = form;
    this.schema = schema;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getInjector(key: string) {
    return Injector.create({
      providers: [
        {provide: FORM, useValue: this.form.controls[key] },
        {provide: SCHEMA, useValue: this.schema.controls[key] }
      ],
      parent: this.injector
    });
  }

  private creatInjectors(form: FormEntity<any>) {
    this.sub = combineLatest([
      form.value$,
      this._schema.asObservable()
    ]).pipe(
      filter(([_, schema]) => !!schema),  // Make sure that schema exist
      map(([value]) => value),            // Only get the value to check the keys
      distinctUntilChanged((a, b) => Object.keys(a).length === Object.keys(b).length),
    ).subscribe(() => {
      // TODO: Optimize -> Only update the injector, not the component
      for (const key in this.schema.controls) {
        this.components[key] = {
          injector: this.getInjector(key),
          component: getComponent(this.schema.controls[key])
        }
        this.cdr.markForCheck();
      }
    })
  }
}