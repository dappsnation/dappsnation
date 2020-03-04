import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTextSchema, TextFormComponent, TextFormModule } from '../text/text.component';
import { EntityComponent, EntityModule } from './entity.component';
import { FormGroupSchema } from '../../core/types';
import { FormEntity } from '../../core/entity';
import { createForms } from '../../core/public_api';

export default {
  title: 'List Form Component'
};

interface Person {
  firstName: string;
  lastName: string;
}

const schema: FormGroupSchema<Person> = {
  form: 'group',
  controls: {
    firstName: <MatTextSchema>{
      form: 'control',
      label: 'First Name',
      hint: 'Some hint',
      load: () => import('../text/text.component').then(c => c.TextFormComponent),
    },
    lastName: <MatTextSchema>{
      form: 'control',
      label: 'Last Name',
      hint: 'Some hint',
      load: () => import('../text/text.component').then(c => c.TextFormComponent),
    }
  }
};
const form = createForms(schema, { firstName: '', lastName: '' });

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, EntityModule, TextFormModule],
    entryComponents: [TextFormComponent], // Should not be part of the entryComponents...
  },
  component: EntityComponent,
  props: {
    form,
    schema
  }
});