import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../../models/entitySchema.js";
import { Korisnik, KorisnikSchema } from "../korisnik/korisnik.js";
import { Projekcija, ProjekcijaSchema } from "../projekcije/projekcija.js";
import { Karta, KartaSchema } from "./karta.js";

export interface Rezervacija {
  korisnikId?: number;
  projekcijaId?: number;
  datumRezervacije?: Date;

  korisnik?: Korisnik;
  projekcija?: Projekcija;

  listaKarata?: Karta[];
}

export class RezervacijaSchema implements EntitySchema<Rezervacija> {
  primaryKey: string | string[];
  tableName = "Rezervacija";
  tableAlias = "r";
  columns: ColumnSchema<any>[] = [
    { name: "korisnikId", getter: "korisnik_id" },
    { name: "projekcijaId", getter: "projekcija_id" },
    { name: "datumRezervacije", getter: "datum_rezervacije" },
  ];
  joinMeta?: JoinMeta[] = [
    {
      joinKeys: ["korisnik_id"],
      subJoin: new KorisnikSchema(),
    },
    { joinKeys: ["projekcija_id"], subJoin: new ProjekcijaSchema() },
    {
      joinKeys: ["korisnik_id", "projekcija_id"],
      subJoin: new KartaSchema(),
    },
  ];
  constructor(public filter?: Rezervacija, public payload?: Rezervacija) {}
  static parseDbRow(rows: any[]): Rezervacija[] {
    const rezervacijaUnique = new Map<string, Rezervacija>();
    rows.forEach((row) => {
      row.salaId = row.salaId[0];
      row.projekcijaId = row.projekcijaId[0];
      row.korisnikId = row.korisnikId[0];
      const {
        email,
        ime,
        prezime,
        korisnikId,
        datumRezervacije,
        projekcijaId,
        salaId,
        sedisteId,
      } = row;
      const { kartaId } = row;
      const rezervacija = rezervacijaUnique.get(
        `${projekcijaId},${korisnikId}`
      );
      if (rezervacija) {
        rezervacija.listaKarata.push({
          kartaId,
          korisnikId,
          projekcijaId,
          sedisteId,
          salaId,
        });
      } else {
        const newRez = {
          datumRezervacije,
          listaKarata: [
            {
              kartaId,
              korisnikId,
              projekcijaId,
              sedisteId,
              salaId,
            },
          ],
          projekcijaId,
          salaId,
          sedisteId,
          korisnik: {
            id: korisnikId,
            email,
            ime,
            prezime,
          },
          korisnikId,

          projekcija: {
            ...ProjekcijaSchema.parseDbSingleRow(row),
            id: projekcijaId,
          },
        };
        rezervacijaUnique.set(`${projekcijaId},${korisnikId}`, newRez);
      }
    });
    return Array.from(rezervacijaUnique.values());
  }
}
