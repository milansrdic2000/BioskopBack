import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../../models/entitySchema.js";
import { Film, FilmSchema } from "../film/film.js";
import { Sala, SalaSchema } from "../sala/sala.js";

export enum TipProjekcije {
  _2D = "2D",
  _3D = "3D",
}
export interface Projekcija {
  id?: number;
  datumProjekcije?: Date;
  cenaKarte?: number;
  tipProjekcije?: TipProjekcije;
  salaId?: number;
  filmId?: number;

  sala?: Sala;
  film?: Film;
}

export class ProjekcijaSchema implements EntitySchema<Projekcija> {
  primaryKey: string | string[];
  tableName = "ProjekcijaFilma";
  tableAlias = "pf";
  columns: ColumnSchema<Projekcija>[] = [
    { name: "id", autoIncrement: true, primaryKey: true },
    { name: "datumProjekcije", getter: "datum_projekcije", operator: ">" },
    { name: "cenaKarte", getter: "cena_karte" },
    { name: "tipProjekcije", getter: "tip_projekcije" },
    { name: "salaId", getter: "sala_id" },
    { name: "filmId", getter: "film_id" },
  ];
  joinMeta: JoinMeta[];
  joinKeys?: string[] = ["id"];
  constructor(public filter?: Projekcija, public payload?: Projekcija) {
    const filmSchema = new FilmSchema();
    filmSchema.joinMeta = [];
    const salaSchema = new SalaSchema();
    salaSchema.joinMeta = [];
    this.joinMeta = [
      {
        subJoin: salaSchema,
        joinType: "INNER",
        joinKeys: ["sala_id"],
      },
      {
        subJoin: filmSchema,
        joinType: "INNER",
        joinKeys: ["film_id"],
      },
    ];
  }
  static parseDbSingleRow(row: any): Projekcija {
    const {
      administratorId,
      zanrId,
      reziserId,
      cenaKarte,
      datumPremijere,
      datumProjekcije,
      nazivFilma,
      nazivSale,
      opisFilma,
      tipProjekcije,
      trajanje,
      salaId,
      filmId,
      id: [idProjekcije],
    } = row;
    return {
      id: idProjekcije,
      datumProjekcije,
      cenaKarte,
      tipProjekcije,
      salaId,
      filmId,
      sala: {
        id: salaId,
        nazivSale: nazivSale,
      },
      film: {
        id: filmId,
        nazivFilma,
        datumPremijere,
      },
    };
  }
  static parseDbRow(rows: any[]): Projekcija[] {
    return rows.map((row) => {
      return this.parseDbSingleRow(row);
    });
  }
}
