import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectSchema, matSelect } from './select.schema';
import { SelectFormModule, SelectFormComponent } from './select.component';
import { createForms, FormFactoryModule } from 'ng-form-factory';
import { Component } from '@angular/core';
import { OptionOutlet } from './option-outlet';

export default {
  title: 'Mat select'
}

const countries = {
  france: 'France',
  germany: 'Germany',
}

@Component({ template: '<b>{{ option }}</b>'})
class Option implements OptionOutlet<string> {
  option: string;
}

const schema: MatSelectSchema<string> = matSelect({
  load: () => import('./select.component').then(c => c.SelectFormComponent),
  label: 'Select a value',
  options: countries,
  optionTemplate: () => Promise.resolve(Option)
});

const form = createForms(schema, 'france');

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, SelectFormModule, FormFactoryModule],
    declarations: [Option],
    entryComponents: [SelectFormComponent, Option]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form,
    schema
  }
});