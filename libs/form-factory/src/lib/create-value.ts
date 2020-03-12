import { FormSchema, isArraySchema, isGroupSchema, GetEntity } from "./types";

/**
 * Create all default values to initialize the form
 * @param schema The schema to base the form upon
 * @param initial Initial value
 */
export function createValue<Schema extends FormSchema, T = GetEntity<Schema>>(schema: Schema, initial?: Partial<T>): T {
  if (isArraySchema(schema)) {
    return schema.controls.map((node, i) => {
      const value = initial && initial[i];
      return createValue(node, value);
    }) as any;
  } else if (isGroupSchema(schema)) {
    return Object.keys(schema.controls).reduce((acc, key) => {
      const value = initial && initial[key];
      acc[key] = createValue(schema.controls[key], value);
      return acc;
    }, {}) as T;
  } else {
    return initial as any;
  }
}