import { TextFormModule, TextFormComponent, MatTextSchema } from './text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormOutletModule } from '../../components/form-outlet';
import { createForms } from '../../core/public_api';


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
    imports: [BrowserAnimationsModule, TextFormModule, FormOutletModule],
    entryComponents: [TextFormComponent]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form,
    schema
  }
});