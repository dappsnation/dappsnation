import { FormSchema, isArraySchema, isGroupSchema, GetEntity } from "./types";

/**
 * Create all default values to initialize the form
 * @param schema The schema to base the form upon
 * @param initial Initial value
 */
export function createState<Schema extends FormSchema, T = GetEntity<Schema>>(schema: Schema, initial?: Partial<T>): T {
  // Array
  if (isArraySchema(schema)) {
    return schema.controls.map((node, i) => {
      const value = initial && initial[i];
      return createState(node, value);
    }) as any;
  }
  // Group
  if (isGroupSchema(schema)) {
    return Object.keys(schema.controls).reduce((acc, key) => {
      const value = initial && initial[key];
      acc[key] = createState(schema.controls[key], value);
      return acc;
    }, {}) as T;
  }
  // Other
  return initial as any;
}