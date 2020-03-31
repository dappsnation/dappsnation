import { Directive, ComponentFactoryResolver, ViewContainerRef, Input, ChangeDetectorRef, InjectionToken } from '@angular/core';
import { MatSelectSchema } from './select.schema';

export const OPTION = new InjectionToken<OptionOutlet<any>>('Context holding the form & schema');


export interface OptionOutlet<T> {
  option: T;
}

@Directive({
  selector: '[option] [schema] option-outlet',
})
export class OptionOutletDirective<T> {
  @Input() schema: MatSelectSchema<T>;
  @Input() option: T;

  constructor(
    private resolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const component = await this.schema.optionTemplate();
    const factory = this.resolver.resolveComponentFactory(component);
    const ref = this.containerRef.createComponent(factory, this.containerRef.length);
    ref.instance.option = this.option;
    this.cdr.markForCheck();  // Needed for deep nested components
  }
}
