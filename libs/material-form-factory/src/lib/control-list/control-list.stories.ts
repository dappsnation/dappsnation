import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlListModule, ControlListComponent } from './control-list.component';
import { TextFormComponent, TextFormModule, matText } from '../text';
import { FormList, FormArraySchema, FormFactoryModule, FormFactory } from 'ng-form-factory';

export default {
  title: 'List Form Component'
};

const factory: FormFactory = {
  'text': () => import('../text/text.component').then(c => c.TextFormComponent),
  'list': () => import('./control-list.component').then(c => c.ControlListComponent),
}

const schema: FormArraySchema<string> = {
  form: 'array',
  load: 'list',
  factory: matText({
    label: 'Text here',
    hint: 'Some hint',
    load: 'text',
  }),
  controls: []
};
const form = FormList.factory(schema, ['some text'], (text: string) => new FormControl(text))

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