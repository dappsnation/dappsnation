import { Directive, ComponentFactoryResolver, ComponentRef, ViewContainerRef, Input, Optional, Injector, Inject, ChangeDetectorRef, SkipSelf, forwardRef, InjectionToken } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormSchema, isControlSchema, isGroupSchema, isArraySchema, FormOutlet } from './types';
import { getFactory } from './list';
import { FormFactory } from './service';
import { CONTEXT } from './tokens';



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
    private formFactory: FormFactory,
    private resolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    if (this.context) {
      this.form = this.context.form.get(`${this.path}`);
      this.schema = getChildSchema(this.context.schema, this.path, this.form);
    }
    const component = await this.formFactory.createComponent(this.schema, this.form);
    const factory = this.resolver.resolveComponentFactory(component);
    const injector = this.createInjector();
    this.ref = this.containerRef.createComponent(factory, this.containerRef.length, injector);
    this.ref.instance.form = this.form;
    this.ref.instance.schema = this.schema;
    this.cdr.markForCheck();  // Needed for deep nested components
  }

  createInjector() {
    return Injector.create({
      providers: [{ provide: CONTEXT, useValue: { form: this.form, schema: this.schema }}],
      parent: this.containerRef.injector
    })
  }
}



