// Required for good type export
import { TextFormComponent, matText } from 'material-form-factory/text';
import { SelectFormComponent, matSelect } from 'material-form-factory/select';
import { FormAutocompleteComponent } from 'material-form-factory/autocomplete';
import { EntityComponent, matGroup } from 'material-form-factory/entity';
import { ControlListComponent, matArray } from 'material-form-factory/control-list';
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
    schema: matText,
    state: (text: string) => text || ''
  },
  select: {
    component: () => import('material-form-factory/select').then(c => c.SelectFormComponent),
    schema: matSelect,
    state: (text: string) => text || ''
  },
  autocomplete: {
    component: () => import('material-form-factory/autocomplete').then(c => c.FormAutocompleteComponent),
    schema: matSelect,
    state: (text: string) => text || ''
  },
  group: {
    component: () => import('material-form-factory/entity').then(c => c.EntityComponent),
    schema: matGroup,
    state: <T>(entity: Partial<T> = {}) => ({ ...entity })
  },
  array: {
    component: () => import('material-form-factory/control-list').then(c => c.ControlListComponent),
    schema: matArray,
    state: <T>(list: Partial<T>[] = []) => list
  }
} as const
