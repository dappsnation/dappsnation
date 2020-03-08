import { Directive, ComponentFactoryResolver, ComponentRef, ViewContainerRef, Input, NgModule, Optional, Injector, Inject, ChangeDetectorRef, ModuleWithProviders, Type, SkipSelf, forwardRef, InjectionToken } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormSchema, isControlSchema, isGroupSchema, isArraySchema } from './types';
import { getFactory } from './list';


export const CONTEXT = new InjectionToken<FormOutlet>('Context holding the form & schema');
export const FACTORY = new InjectionToken<FormFactory>('Factory used to generate form component');

export interface FormFactory {
  [key: string]: (form?: AbstractControl) => Promise<Type<any>>;
}


export interface FormOutlet {
  form: AbstractControl;
  schema: FormSchema;
}

/**
 * Get the child schema
 * @param parent The parent schema
 * @param path The path to access the child schema
 * @param form The form linked to the child schema. Used for FormArraySchema
 */
export function getChildSchema(parent: FormSchema, path: string | number, form?: AbstractControl) {
  if (isControlSchema(parent)) {
    return parent;
  } else if (isGroupSchema(parent)) {
    return parent.controls[path];
  } else if (isArraySchema(parent)) {
    return parent.controls[path] || getFactory(parent, form.value);
  } else {
    throw new Error(`Schema provided doesn't match the schema interface. Received: ${JSON.stringify(parent)}`)
  }
}

@Directive({
  selector: '[form] [schema] form-outlet, [path] form-outlet',
  providers:  [{ provide: CONTEXT, useExisting: forwardRef(() => FormOutletDirective) }]
})
export class FormOutletDirective {
  ref: ComponentRef<FormOutlet>;
  @Input() form: AbstractControl;
  @Input() schema: FormSchema;
  @Input() path: string;

  constructor(
    @SkipSelf() @Optional() @Inject(CONTEXT) private context: FormOutletDirective,
    @Optional() @Inject(FACTORY) private factory: FormFactory,
    private resolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    if (this.context) {
      this.form = this.context.form.get(`${this.path}`);
      this.schema = getChildSchema(this.context.schema, this.path, this.form);
    }
    const component = await this.getComponent();
    const factory = this.resolver.resolveComponentFactory(component);
    const injector = this.createInjector();
    this.ref = this.containerRef.createComponent(factory, this.containerRef.length, injector);
    this.ref.instance.form = this.form;
    this.ref.instance.schema = this.schema;
    this.cdr.markForCheck();  // Needed for deep nested components
  }

  getComponent(): Promise<Type<FormOutlet>> {
    if (this.schema.load) {
      if (typeof this.schema.load === 'string') {
        if (!this.factory) {
          throw new Error(`Cannot load schema with key ${this.schema.load} as no Factory has been provided in FormFactoryModule.`)
        } else if (this.schema.load in this.factory) {
          return this.factory[this.schema.load](this.form);
        } else {
          throw new Error(`Cannot load schema with key ${this.schema.load} as it's not part of the factory ${this.factory}.`)
        }
      } else if (typeof this.schema.load === 'function') {
        return this.schema.load(this.form);
      } else {
        throw new Error(`Property "load" of schema ${this.schema} should be either a string or a function.`)
      }
    }
  }

  createInjector() {
    return Injector.create({
      providers: [{ provide: CONTEXT, useValue: { form: this.form, schema: this.schema }}],
      parent: this.containerRef.injector
    })
  }
}



@NgModule({
  declarations: [FormOutletDirective],
  exports: [FormOutletDirective],
})
export class FormFactoryModule {
  static forRoot(factory: FormFactory): ModuleWithProviders  {
    return { 
      ngModule: FormFactoryModule,
      providers: [{ provide: FACTORY, useValue: factory }] 
    }
  }
}
