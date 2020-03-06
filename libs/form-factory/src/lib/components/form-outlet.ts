import { Directive, ComponentFactoryResolver, ComponentRef, ViewContainerRef, Input, NgModule, Optional, Injector, Inject, ChangeDetectorRef, ModuleWithProviders, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormSchema, isControlSchema, isGroupSchema, isArraySchema } from '../core/types';
import { FormFactory, FACTORY } from './token';
import { getFactory } from '../core/list';


export interface FormOutlet {
  form: AbstractControl;
  schema: FormSchema;
}

export function getSchema(parent: FormSchema, path: string | number, form: AbstractControl) {
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
  selector: '[form] [schema] form-outlet, [path] form-outlet'
})
export class FormOutletDirective {
  ref: ComponentRef<FormOutlet>;
  @Input() form: AbstractControl;
  @Input() schema: FormSchema;
  @Input() path: string;

  constructor(
    @Optional() @Inject('CONTEXT') private context: FormOutlet,
    @Optional() @Inject(FACTORY) private factory: FormFactory,
    private resolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    if (this.context) {
      this.form = this.context.form.get(`${this.path}`);
      this.schema = getSchema(this.context.schema, this.path, this.form);
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
      providers: [{ provide: 'CONTEXT', useValue: { form: this.form, schema: this.schema }}],
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
      providers: [{ provide: FACTORY, useValue: factory}] 
    }
  }
}