import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlListModule, ControlListComponent } from './control-list.component';
import { TextFormComponent, TextFormModule, matText } from '../text';
import { FormList, FormArraySchema, FormFactoryModule, Factory } from 'ng-form-factory';
import { FormField } from 'ng-form-factory/field';

export default {
  title: 'List Form Component'
};

const factory: Factory = {
  'text': {
    component: () => import('../text/text.component').then(c => c.TextFormComponent),
  },
  'array': {
    component: () => import('./control-list.component').then(c => c.ControlListComponent),
  },
  'group': {

  }
}

const textSchema = matText({
  label: 'Text here',
  hint: 'Some hint',
  load: 'text',
});
const schema: FormArraySchema<string> = {
  form: 'array',
  load: 'array',
  factory: textSchema,
  controls: []
};

const form = FormList.factory(schema, ['some text'], (text: string) => new FormField(textSchema, text))

export const main = () => ({
  moduleMetadata: {
    imports: [
      FormFactoryModule.forRoot(factory),
      BrowserAnimationsModule,
      ControlListModule,
      TextFormModule
    ],
    entryComponents: [ControlListComponent, TextFormComponent], // Should not be part of the entryComponents...
  },
  template: `<form-outlet [form]="form" [schema]="schema"></form-outlet>`,
  props: {
    form,
    schema
  }
});