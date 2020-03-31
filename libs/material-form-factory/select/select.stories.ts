import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectSchema, matSelect } from './select.schema';
import { SelectFormModule, SelectFormComponent } from './select.component';
import { createForms, FormFactoryModule, GetStateType } from 'ng-form-factory';
import { Component } from '@angular/core';
import { OptionOutlet } from './option-outlet';

export default {
  title: 'Mat select',
}

const countries = {
  france: 'France',
  germany: 'Germany',
  korea: 'Korea',
  russia: 'Russia'
} as const

type Countries = keyof typeof countries;

////////////////////
// CUSTOM OPTIONS //
////////////////////

@Component({ template: '<b>{{ option }}</b>'})
class Option implements OptionOutlet<Countries> {
  option: Countries;
}
const schema_1: MatSelectSchema<Countries> = matSelect({
  load: () => import('./select.component').then(c => c.SelectFormComponent),
  label: 'Select a value',
  options: countries,
  optionTemplate: () => Promise.resolve(Option)
});
const form_1 = createForms(schema_1, 'france');

export const customOptions = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, SelectFormModule, FormFactoryModule],
    declarations: [Option],
    entryComponents: [SelectFormComponent, Option]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    schema: schema_1,
    form: form_1,
  }
});


//////////////
// Multiple //
//////////////
const schema_2: MatSelectSchema<Countries[]> = matSelect({
  load: () => import('./select.component').then(c => c.SelectFormComponent),
  label: 'Select multiple values',
  multiple: true,
  options: countries,
});
const form_2 = createForms(schema_2, ['france']);
export const multiple = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, SelectFormModule, FormFactoryModule],
    entryComponents: [SelectFormComponent]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    schema: schema_2,
    form: form_2,
  }
});
