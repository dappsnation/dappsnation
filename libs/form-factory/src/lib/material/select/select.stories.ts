import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectSchema, matSelect } from './select.schema';
import { SelectFormModule, SelectFormComponent } from './select.component';
import { createForms, FormFactoryModule } from '../../core';

export default {
  title: 'Mat select'
}

const countries = {
  france: 'France',
  germany: 'Germany',
}

const schema: MatSelectSchema<string> = matSelect({
  load: () => import('./select.component').then(c => c.SelectFormComponent),
  label: 'Select a value',
  options: countries
});

const form = createForms(schema, '');

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, SelectFormModule, FormFactoryModule],
    entryComponents: [SelectFormComponent]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form,
    schema
  }
});