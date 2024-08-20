import { ColumnSchema, EntitySchema } from "../../models/entitySchema.js";

export interface Korisnik {
  id: number;
  email?: string;
  sifra?: string;
  ime?: string;
  prezime?: string;
  datumRodjenja?: Date;
}

export class KorisnikSchema implements EntitySchema<Korisnik> {
  tableName = "korisnik";
  tableAlias = "ko";
  primaryKey = "id";
  autoIncrement = "id";
  joinKeys?: string[] = ["id"];
  columns: ColumnSchema<Korisnik>[] = [
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
    {
      name: "datumRodjenja",
      getter: "datum_rodjenja",
      required: true,
    },
  ];
  constructor(
    public filter?: Partial<Korisnik>,
    public payload?: Partial<Korisnik>
  ) {}
}
