import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFormComponent, TextFormModule, matText } from '../text';
import { EntityComponent, EntityModule } from './entity.component';
import { FormGroupSchema, FormFactoryModule, createForms } from 'ng-form-factory';


export default {
  title: 'Entity Form Component'
};

interface Person {
  displayName: string;
  address: {
    country: string;
  };
}

const initial: Person = {
  displayName: 'Grand Schtroumpf',
  address: {
    country: 'Germany'
  }
}

const schema: FormGroupSchema<Person> = {
  form: 'group',
  load: () => import('./entity.component').then(c => c.EntityComponent),
  controls: {
    displayName: matText({
      label: 'First Name',
      hint: 'Some hint',
      load: () => import('../text/text.component').then(c => c.TextFormComponent),
    }),
    address: {
      form: 'group',
      load: () => import('./entity.component').then(c => c.EntityComponent),
      controls: {
        country: matText({
          label: 'Last Name',
          hint: 'Some hint',
          load: () => import('../text/text.component').then(c => c.TextFormComponent),
        })
      }
    }
  }
};
const form = createForms(schema, initial);

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, EntityModule, TextFormModule, FormFactoryModule],
    entryComponents: [EntityComponent, TextFormComponent], // Should not be part of the entryComponents...
  },
  template: '<form-outlet [form]="form" [schema]="schema"></form-outlet>',
  props: {
    form,
    schema
  }
});
