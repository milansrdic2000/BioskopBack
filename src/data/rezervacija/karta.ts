import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../../models/entitySchema.js";

export interface Karta {
  korisnikId?: number;
  projekcijaId?: number;
  kartaId?: number;
  salaId?: number;
  sedisteId?: number;
}

export class KartaSchema implements EntitySchema<Karta> {
  tableName = "Karta";
  tableAlias = "kar";
  columns: ColumnSchema<any>[] = [
    { name: "korisnikId", getter: "korisnik_id" },
    { name: "projekcijaId", getter: "projekcija_id" },
    {
      name: "kartaId",
      getter: "karta_id",
      autoIncrement: true,
      primaryKey: true,
    },
    { name: "salaId", getter: "sala_id" },
    { name: "sedisteId", getter: "sediste_id" },
  ];
  joinKeys?: string[] = ["korisnik_id", "projekcija_id"];

  primaryKey: string | string[];
  autoIncrement?: string;
  insertQuery?: string;
  updateQuery?: string;
  joinType?: string;
  joinMeta?: JoinMeta[];

  parseDbRow?: (rows: Karta | Karta[]) => Karta | Karta[];

  constructor(public filter?: Karta, public payload?: Karta) {}
}
