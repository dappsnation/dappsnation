// Required for good type export
import { TextFormComponent } from 'material-form-factory/text';
import { SelectFormComponent } from 'material-form-factory/select';
import { FormAutocompleteComponent } from 'material-form-factory/autocomplete';
import { EntityComponent } from 'material-form-factory/entity';
import { ControlListComponent } from 'material-form-factory/control-list';

export const materialFormFactory = {
  text: () => import('material-form-factory/text').then(c => c.TextFormComponent),
  select: () => import('material-form-factory/select').then(c => c.SelectFormComponent),
  autocomplete: () => import('material-form-factory/autocomplete').then(c => c.FormAutocompleteComponent),
  entity: () => import('material-form-factory/entity').then(c => c.EntityComponent),
  list: () => import('material-form-factory/control-list').then(c => c.ControlListComponent)
} as const

export type MaterialFormFactory = keyof typeof materialFormFactory;