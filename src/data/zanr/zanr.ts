import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../../models/entitySchema.js";

export interface Zanr {
  id: number;
  imeZanra: string;
}

export class ZanrSchema implements EntitySchema<Zanr> {
  columns: ColumnSchema<Zanr>[];
  tableName = "zanr";
  tableAlias = "zr";
  primaryKey = "id";
  autoIncrement = "id";

  joinKeys?: string[] = ["id"];
  joinType?: string;
  joinMeta?: JoinMeta[];
  getDatabaseColumnName?: (string: any) => string;
  constructor(public filter?: Partial<Zanr>, public payload?: Partial<Zanr>) {
    this.columns = [
      {
        name: "id",
        primaryKey: true,
        required: true,
        autoIncrement: true,
      },
      {
        name: "imeZanra",
        getter: "ime_zanra",
        required: true,
      },
    ];
  }
}
