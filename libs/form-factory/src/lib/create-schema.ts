/**
 * Create a schema based on a typescript-like type 
 * @param types type definition string
 * @param label labe for the schema
 * @example 
 * ```typescript
 * createSchema('string[]') // FormArraySchema<string>
 * createSchema({ name: 'string' }) // FormGroupSchema<{ name: string }>
 * ``` 
 */
export function createSchema(types: Object | string, label: string = '') {
  if (typeof types === 'string') {
    return createControlSchema(types, label);
  } else if (typeof types === 'object') {
    return createGroupSchema(types, label);
  }
}

/**
 * Create a control schema based on a type definition string
 * @param types type definition string
 * @param label labe for the schema
 * @example 
 * ```typescript
 * createControlSchema('string[]') // FormArraySchema<string>
 * createControlSchema('number') // FormControlSchema<number>
 * ``` 
 */
export function createControlSchema(types: string, label: string = '') {
  if (types === 'string') {
    return { form: 'control', load: 'text', label };
  } else if (types === 'number') {
    return { form: 'control', load: 'text', label };
  } else if (types.includes('[]')) {
    return { form: 'array', load: 'list', controls: [], factory: createSchema(types.replace('[]', '')), label }
  } 
}


/**
 * Create a schema based on a typescript-like type 
 * @param types type definition string (reference are not supported yet)
 * @param label labe for the schema
 * @example 
 * ```typescript
 * createSchema({ movies: 'string[]', count: number ) // FormGroupSchema<{ movies: string[], count: number }>
 * createSchema({ name: 'string' }) // FormGroupSchema<{ name: string }>
 * ``` 
 */
export function createGroupSchema(types: Object, label: string = '') {
  const controls = {};
  for (const key in types) {
    const value = types[key]
    controls[key] = createSchema(value, key);
  }
  return { form: 'group', load: 'entity', controls, label };
}
