import { AdministratorSchema, } from "../administrator/administrator.js";
import { ReziserSchema } from "../reziser/reziser.js";
import { ZanrSchema } from "../zanr/zanr.js";
export class FilmSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "film";
        this.tableAlias = "fi";
        this.primaryKey = "id";
        this.autoIncrement = "id";
        this.joinKeys = ["id"];
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
    static parseDbRow(rows) {
        if (!Array.isArray(rows)) {
            const { id: [idFilma, idRezisera, idZanra, idAdministratora], ime: [imeRezisera, imeAdministratora], prezime: [prezimeRezisera, prezimeAdministratora], nazivFilma, opisFilma, trajanje, datumPremijere, reziserId, imeZanra, zanrId, administratorId, email, imgPath, sifra, } = rows;
            const film = {
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
//# sourceMappingURL=film.js.map