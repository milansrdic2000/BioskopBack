import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../../models/entitySchema.js";

export interface Reziser {
  id?: number;
  ime?: string;
  prezime?: string;
}

export class ReziserSchema implements EntitySchema<Reziser> {
  columns: ColumnSchema<Reziser>[];
  tableName = "reziser";
  tableAlias = "re";
  primaryKey = "id";
  autoIncrement = "id";

  joinKeys?: string[] = ["id"];
  joinType?: string;
  joinMeta?: JoinMeta[];
  getDatabaseColumnName?: (string: any) => string;
  constructor(
    public filter?: Partial<Reziser>,
    public payload?: Partial<Reziser>
  ) {
    this.columns = [
      {
        name: "id",
        primaryKey: true,
        required: true,
        autoIncrement: true,
      },
      {
        name: "ime",
        getter: "ime",
        required: true,
      },
      {
        name: "prezime",
        getter: "prezime",
        required: true,
      },
    ];
  }
}
