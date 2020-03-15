// Required for good type export
import { TextFormComponent, matText, MatTextSchema } from 'material-form-factory/text';
import { SelectFormComponent, matSelect } from 'material-form-factory/select';
import { FormAutocompleteComponent } from 'material-form-factory/autocomplete';
import { EntityComponent } from 'material-form-factory/entity';
import { ControlListComponent } from 'material-form-factory/control-list';
import { Factory } from 'ng-form-factory';

interface MaterialFormFactory {
  text: string;
  select: string;
  autocomplete: string;
  group: object;
  array: any[];
}

export const materialFormFactory: Factory<MaterialFormFactory> = {
  text: {
    component: () => import('material-form-factory/text').then(c => c.TextFormComponent),
    schema: matText
  },
  select: {
    component: () => import('material-form-factory/select').then(c => c.SelectFormComponent),
    schema: matSelect
  },
  autocomplete: {
    component: () => import('material-form-factory/autocomplete').then(c => c.FormAutocompleteComponent),
    schema: matSelect
  },
  group: {
    component: () => import('material-form-factory/entity').then(c => c.EntityComponent)
  },
  array: {
    component: () => import('material-form-factory/control-list').then(c => c.ControlListComponent)
  }
} as const
