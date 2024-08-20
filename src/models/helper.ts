import { ColumnSchema, EntitySchema } from "./entitySchema.js";

export function getDbColumnName(
  objProp: string,
  entitySchema: EntitySchema<any>
): string {
  return (
    entitySchema.columns.find((col) => col.name.toString() === objProp)
      ?.getter || objProp
  );
}
export function getDbColumn(
  objProp: string,
  entitySchema: EntitySchema<any>
): ColumnSchema<any> {
  return entitySchema.columns.find((col) => col.name.toString() === objProp);
}
