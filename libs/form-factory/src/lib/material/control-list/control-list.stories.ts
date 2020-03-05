import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlListModule, ControlListComponent } from './control-list.component';
import { MatTextSchema, TextFormComponent, TextFormModule } from '../text/text.component';
import { FormList } from '../../core/list';
import { FormArraySchema } from '../../core/types';
import { FormFactory } from '../../components/token';
import { FormOutletModule } from '../../components/form-outlet';

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
  factory: <MatTextSchema>{
    form: 'control',
    label: 'Text here',
    hint: 'Some hint',
    load: 'text',
  },
  controls: []
};
const form = FormList.factory(schema, ['some text'], (text: string) => new FormControl(text))

export const main = () => ({
  moduleMetadata: {
    imports: [
      FormOutletModule.forRoot(factory),
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