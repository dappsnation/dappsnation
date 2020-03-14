import { ModuleWithProviders, NgModule } from '@angular/core';
import { Factory } from './types';
import { FormOutletDirective } from './form-outlet';
import { FormFactory } from './service';
import { FACTORY } from './tokens';

@NgModule({
  declarations: [FormOutletDirective],
  exports: [FormOutletDirective],
  providers: [FormFactory]
})
export class FormFactoryModule {
  static forRoot(factory: Factory): ModuleWithProviders  {
    const required = ['array', 'group'];
    if (required.every(require => Object.keys(factory).includes(require))) {
      throw new Error(`Factory should at least have the keys: ${required.join(', ')}`);
    }
    return { 
      ngModule: FormFactoryModule,
      providers: [{ provide: FACTORY, useValue: factory }] 
    }
  }
}
