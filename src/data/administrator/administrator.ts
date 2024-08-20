import { ColumnSchema, EntitySchema } from "../../models/entitySchema.js";

export interface Administrator {
  id?: number;
  email?: string;
  sifra?: string;
  ime?: string;
  prezime?: string;
}

export class AdministratorSchema implements EntitySchema<Administrator> {
  columns: ColumnSchema<Administrator>[] = [
    {
      name: "id",
      primaryKey: true,
      required: true,
      autoIncrement: true,
    },
    {
      name: "email",
      required: true,
    },
    {
      name: "sifra",
      required: true,
      hide: true,
    },
    {
      name: "ime",
      required: true,
    },
    {
      name: "prezime",
      required: true,
    },
  ];
  joinKeys?: string[] = ["id"];
  tableName = "administrator";
  tableAlias = "ad";
  primaryKey = "id";
  autoIncrement = "id";
  constructor(
    public filter?: Partial<Administrator>,
    public payload?: Partial<Administrator>
  ) {}
}
