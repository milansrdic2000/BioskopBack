import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../../models/entitySchema.js";
import { Sala, SalaSchema } from "./sala.js";

export interface Sediste {
  idSale?: number;
  idSedista?: number;
  red?: number;
  kolona?: number;
  operation?: "ADD" | "DELETE";
  sala?: Sala;
}

export class SedisteSchema implements EntitySchema<Sediste> {
  primaryKey: string | string[];
  tableName = "Sediste";
  tableAlias = "sed";
  columns: ColumnSchema<Sediste>[] = [
    { name: "idSale", getter: "sala_id", primaryKey: true },
    {
      name: "idSedista",
      getter: "sediste_id",
      primaryKey: true,
      autoIncrement: true,
    },
    { name: "red" },
    { name: "kolona" },
  ];
  joinKeys?: string[] = ["sala_id"];
  constructor(public filter?: Sediste, public payload?: Sediste) {}
}
