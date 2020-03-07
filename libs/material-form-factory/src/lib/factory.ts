export const materialFormFactory = {
  text: () => import('./text/text.component').then(c => c.TextFormComponent),
  select: () => import('./select/select.component').then(c => c.SelectFormComponent),
  autocomplete: () => import('./autocomplete/autocomplete.component').then(c => c.FormAutocompleteComponent),
  entity: () => import('./entity/entity.component').then(c => c.EntityComponent),
  list: () => import('./control-list/control-list.component').then(c => c.ControlListComponent)
} as const

export type MaterialFormFactory = keyof typeof materialFormFactory;