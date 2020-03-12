import { GetSchema, FormGroupSchema, FormArraySchema, FormControlSchema } from "./types";

function isArray(value: any): value is any[] {
  return Array.isArray(value)
}
function isGroup(value: any): value is object {
  return typeof value === 'object'
}

/**
 * Create the schema required to create the value
 * @param value Value that you could create with the generated schema
 */
export function valueToSchema<T>(value: T): GetSchema<T> {
  if (isArray(value)) {
    return arrayToSchema(value) as any;
  } else if (isGroup(value)) {
    return groupToSchema(value) as any;
  } else {
    return controlToSchema(value) as any;
  }
}

function groupToSchema<T extends object>(value: T): FormGroupSchema<T> {
  const controls: GetSchema<T>['controls'] = {};
  for (const key in value) {
    controls[key as any] = valueToSchema(value[key]);
  }
  return { form: 'group', controls };
}

function arrayToSchema<T>(value: T[] = []): FormArraySchema<T> {
  const controls = value.map(v => valueToSchema(v));
  const factory: any = value[0] ? valueToSchema(value[0]) : { form: 'control' };
  return { form: 'array', factory, controls };
}

function controlToSchema<T>(value: T): FormControlSchema {
  return { form: 'control' };
}
