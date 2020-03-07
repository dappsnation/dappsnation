import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectSchema, matSelect } from '../select/select.schema';
import { FormAutocompleteModule, FormAutocompleteComponent } from './autocomplete.component';
import { createForms, FormFactoryModule } from '../../core';

export default {
  title: 'Mat autocomplete'
}

const countries = {
  france: 'France',
  germany: 'Germany',
}

const schema: MatSelectSchema<string> = matSelect({
  load: () => import('./autocomplete.component').then(c => c.FormAutocompleteComponent),
  label: 'Select a value',
  options: countries
});

const form = createForms(schema, '');

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, FormAutocompleteModule, FormFactoryModule],
    entryComponents: [FormAutocompleteComponent]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form,
    schema
  }
});