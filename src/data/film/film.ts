import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../../models/entitySchema.js";
import {
  Administrator,
  AdministratorSchema,
} from "../administrator/administrator.js";
import { Reziser, ReziserSchema } from "../reziser/reziser.js";
import { Zanr, ZanrSchema } from "../zanr/zanr.js";

export interface Film {
  id?: number;
  nazivFilma?: string;
  opisFilma?: string;
  trajanje?: number;
  datumPremijere?: number;
  reziserId?: number;
  zanrId?: number;
  administratorId?: number;
  imgPath?: string;

  reziser?: Reziser;
  zanr?: Zanr;
  administrator?: Administrator;
}
export class FilmSchema implements EntitySchema<Film> {
  columns: ColumnSchema<Film>[];
  tableName = "film";
  tableAlias = "fi";
  primaryKey = "id";
  autoIncrement = "id";

  insertQuery?: string;
  updateQuery?: string;
  joinKeys?: string[] = ["id"];
  joinType?: string;
  joinMeta?: JoinMeta[];
  constructor(public filter?: Partial<Film>, public payload?: Partial<Film>) {
    this.columns = [
      {
        name: "id",
        primaryKey: true,
        required: true,
        autoIncrement: true,
      },
      {
        name: "nazivFilma",
        getter: "naziv_filma",
        required: true,
      },
      {
        name: "opisFilma",
        getter: "opis_filma",
        required: true,
      },
      {
        name: "trajanje",
        getter: "trajanje_u_minutima",
        required: true,
      },
      {
        name: "datumPremijere",
        getter: "datum_premijere",
        required: true,
      },
      {
        name: "reziserId",
        getter: "reziser_id",
        required: true,
      },
      {
        name: "zanrId",
        getter: "zanr_id",
        required: true,
      },
      {
        name: "administratorId",
        getter: "administrator_id",
        required: true,
      },
      {
        name: "imgPath",
        getter: "imgPath",
      },
    ];
    this.joinMeta = [
      {
        joinKeys: ["reziser_Id"],
        subJoin: new ReziserSchema(),
      },
      {
        joinKeys: ["zanr_Id"],
        subJoin: new ZanrSchema(),
      },
      {
        joinKeys: ["administrator_Id"],
        subJoin: new AdministratorSchema(),
      },
    ];
  }
  static parseDbRow(rows: any): Film[] | Film {
    if (!Array.isArray(rows)) {
      const {
        id: [idFilma, idRezisera, idZanra, idAdministratora],
        ime: [imeRezisera, imeAdministratora],
        prezime: [prezimeRezisera, prezimeAdministratora],
        nazivFilma,
        opisFilma,
        trajanje,
        datumPremijere,
        reziserId,
        imeZanra,
        zanrId,
        administratorId,
        email,
        imgPath,
        sifra,
      } = rows;
      const film: Film = {
        id: idFilma,
        nazivFilma,
        opisFilma,
        trajanje,
        datumPremijere,
        reziserId,
        zanrId,
        imgPath,
        administratorId,
        reziser: {
          id: idRezisera,
          ime: imeRezisera,
          prezime: prezimeRezisera,
        },
        zanr: {
          id: idZanra,
          imeZanra: imeZanra,
        },
        administrator: {
          id: idAdministratora,
          ime: imeAdministratora,
          prezime: prezimeAdministratora,
          email,
        },
      };
      return film;
    }

    return rows.map((row) => {
      const idFilma = row.id[0] || row.id;
      return {
        id: idFilma,
        nazivFilma: row.nazivFilma,
        opisFilma: row.opisFilma,
        trajanje: row.trajanje,
        datumPremijere: row.datumPremijere,
        reziserId: row.reziserId,
        zanrId: row.zanrId,
        administratorId: row.administratorId,
        imgPath: row.imgPath,
      };
    });
  }
}
