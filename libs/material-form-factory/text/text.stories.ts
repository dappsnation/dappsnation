import { Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TextFormModule, TextFormComponent } from './text.component';
import { MatTextSchema, matText } from './text.schema';
import { FormFactoryModule, createForms } from 'ng-form-factory';


export default {
  title: 'Text Form Component'
};

const schema_1: MatTextSchema = matText({
  load: () => import('./text.component').then(c => c.TextFormComponent),
  label: 'Add some Text'
});
const form_1 = createForms(schema_1, 'some text');

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, TextFormModule, FormFactoryModule],
    entryComponents: [TextFormComponent]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form: form_1,
    schema: schema_1
  }
});


///////
// Required 

const schema_2: MatTextSchema = matText({
  load: () => import('./text.component').then(c => c.TextFormComponent),
  label: 'Add some Text',
  validators: [Validators.required, Validators.min(2), Validators.max(5)],
  appearance: 'outline',
  errors: {
    required: 'This field is required.',
    min: 'Maximum is 2 characters',
    max: 'Maximum is 5 characters'
  }
});
const form_2 = createForms(schema_2, 'some text');

export const withErrors = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, TextFormModule, FormFactoryModule],
    entryComponents: [TextFormComponent]
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form: form_2,
    schema: schema_2
  }
});