import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFormComponent, TextFormModule, matText } from '../text';
import { EntityComponent, EntityModule } from './entity.component';
import { FormGroupSchema, FormFactoryModule, createForms } from 'ng-form-factory';
import { matSelect, SelectFormComponent, SelectFormModule } from '../select';


export default {
  title: 'Entity Form Component'
};


const country = {
  france: 'France',
  germany: 'Germany',
  usa: 'USA'
} as const;

interface Person {
  displayName: string;
  address: {
    country: keyof typeof country;
  };
}

const initial: Person = {
  displayName: 'Grand Schtroumpf',
  address: {
    country: 'france'
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
        country: matSelect({
          label: 'Country',
          hint: 'Some hint',
          options: country,
          load: () => import('../select/select.component').then(c => c.SelectFormComponent),
        })
      }
    }
  }
};
const form = createForms(schema, initial);

export const main = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, EntityModule, TextFormModule, FormFactoryModule, SelectFormModule],
    entryComponents: [EntityComponent, TextFormComponent, SelectFormComponent], // Should not be part of the entryComponents...
  },
  template: '<form-outlet [form]="form" [schema]="schema"></form-outlet>',
  props: {
    form,
    schema
  }
});
