import { TextFormModule, TextFormComponent } from './text.component';
import { MatTextSchema, matText } from './text.schema';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormFactoryModule, createForms } from 'ng-form-factory';


export default {
  title: 'Text Form Component'
};

const schema: MatTextSchema = matText({
  load: () => import('./text.component').then(c => c.TextFormComponent),
  label: 'Add some Text'
});
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