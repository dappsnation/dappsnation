export function createSchema(types: Object | string, label: string = '') {
  if (typeof types === 'string') {
    return createControlSchema(types, label);
  } else if (typeof types === 'object') {
    return createGroupSchema(types, label);
  }

}

export function createControlSchema(types: string, label: string = '') {
  if (types === 'string') {
    return { form: 'control', load: 'text', label };
  } else if (types === 'number') {
    return { form: 'control', load: 'text', label };
  } else if (types.includes('[]')) {
    return { form: 'array', load: 'list', controls: [], factory: createSchema(types.replace('[]', '')), label }
  } 
}

export function createGroupSchema(types: Object, label: string = '') {
  const controls = {};
  for (const key in types) {
    const value = types[key]
    controls[key] = createSchema(value, key);
  }
  return { form: 'group', load: 'entity', controls, label };
}
