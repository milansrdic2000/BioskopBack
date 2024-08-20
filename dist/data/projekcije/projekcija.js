import { FilmSchema } from "../film/film.js";
import { SalaSchema } from "../sala/sala.js";
export var TipProjekcije;
(function (TipProjekcije) {
    TipProjekcije["_2D"] = "2D";
    TipProjekcije["_3D"] = "3D";
})(TipProjekcije || (TipProjekcije = {}));
export class ProjekcijaSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "ProjekcijaFilma";
        this.tableAlias = "pf";
        this.columns = [
            { name: "id", autoIncrement: true, primaryKey: true },
            { name: "datumProjekcije", getter: "datum_projekcije", operator: ">" },
            { name: "cenaKarte", getter: "cena_karte" },
            { name: "tipProjekcije", getter: "tip_projekcije" },
            { name: "salaId", getter: "sala_id" },
            { name: "filmId", getter: "film_id" },
        ];
        this.joinKeys = ["id"];
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
    static parseDbSingleRow(row) {
        const { administratorId, zanrId, reziserId, cenaKarte, datumPremijere, datumProjekcije, nazivFilma, nazivSale, opisFilma, tipProjekcije, trajanje, salaId, filmId, id: [idProjekcije], } = row;
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
    static parseDbRow(rows) {
        return rows.map((row) => {
            return this.parseDbSingleRow(row);
        });
    }
}
//# sourceMappingURL=projekcija.js.map