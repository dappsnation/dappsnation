import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlListModule, ControlListComponent } from './control-list.component';
import { MatTextSchema, TextFormComponent, TextFormModule } from '../text/text.component';
import { FormList } from '../../core/list';
import { FormArraySchema } from '../../core/types';

export default {
  title: 'List Form Component'
};

const schema: FormArraySchema<string> = {
  form: 'array',
  factory: <MatTextSchema>{
    form: 'control',
    label: 'Text here',
    hint: 'Some hint',
    load: () => import('../text/text.component').then(c => c.TextFormComponent),
  },
  controls: []
};
const form = FormList.factory(schema, ['some text'], (text: string) => new FormControl(text))

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, ControlListModule, TextFormModule],
    entryComponents: [TextFormComponent], // Should not be part of the entryComponents...
  },
  component: ControlListComponent,
  props: {
    form,
    schema
  }
});