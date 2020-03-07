import { TextFormModule, TextFormComponent } from './text.component';
import { MatTextSchema } from './text.schema';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormFactoryModule } from '../../core/form-outlet';
import { createForms } from '../../core';


export default {
  title: 'Text Form Component'
};

const schema: MatTextSchema = {
  form: 'control',
  load: () => import('./text.component').then(c => c.TextFormComponent),
  label: 'Add some Text'
};
const form = createForms(schema, 'some text');

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, TextFormModule, FormFactoryModule],
    entryComponents: [TextFormComponent]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form,
    schema
  }
});