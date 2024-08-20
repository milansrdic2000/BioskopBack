import { formatDate } from "../utils/date-helper.js";
import { KomisijaSchema } from "./komisija.js";
import { UgovorSchema } from "./ugovor.js";
import { ZaposleniSchema } from "./zaposleni.js";
export class ZahtevSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.tableName = "zahtev_za_oslobadjanje";
        this.tableAlias = "zahtev";
        this.primaryKey = "idZahteva";
        this.columns = [
            { name: "idZahteva", type: "number", primaryKey: true },
            { name: "brojUgovora", type: "number" },
            { name: "idKomisije", type: "number" },
            { name: "datumPrijema", type: "date" },
            { name: "datumDiplomiranja", type: "date" },
            { name: "prosecnaOcena", type: "number" },
            { name: "odobreno", type: "boolean" },
            { name: "komentar", type: "string" },
            { name: "vodja", type: "number", getter: "vodja" },
        ];
        this.joinType = "LEFT JOIN";
        const komisijaSchema = new KomisijaSchema();
        komisijaSchema.joinMeta = [];
        this.joinMeta = [
            {
                subJoin: komisijaSchema,
                joinKeys: ["idKomisije"],
                joinType: "LEFT",
            },
            {
                subJoin: new ZaposleniSchema(),
                joinKeys: ["vodja"],
                joinType: "LEFT",
            },
            {
                subJoin: new UgovorSchema(),
                joinKeys: ["brojUgovora"],
                joinType: "LEFT",
            },
        ];
        const datumPrijema = this.payload?.datumPrijema
            ? `'${formatDate(new Date(this.payload?.datumPrijema))}'`
            : null;
        const datumDiplomiranja = this.payload?.datumDiplomiranja
            ? `'${formatDate(new Date(this.payload?.datumDiplomiranja))}'`
            : null;
        this.insertQuery = ` (brojUgovora, idKomisije, datumPrijema, datumDiplomiranja, prosecnaOcena, odobreno, komentar, vodja) VALUES (${this.payload?.brojUgovora}, ${this.payload?.idKomisije}, ${datumPrijema}, ${datumDiplomiranja}, ${this.payload?.prosecnaOcena}, ${this.payload?.odobreno ? 1 : 0}, '${this.payload?.komentar}', ${this.payload?.vodja})`;
        this.updateQuery = `UPDATE zahtev SET brojUgovora = ${this.payload?.brojUgovora}, idKomisije = ${this.payload?.idKomisije}, datumPrijema = ${datumPrijema}, datumDiplomiranja = ${datumDiplomiranja}, prosecnaOcena = ${this.payload?.prosecnaOcena}, odobreno = ${this.payload?.odobreno}, komentar = '${this.payload?.komentar}', vodja = ${this.payload?.vodja} WHERE idZahteva = ${this.payload?.idZahteva}`;
    }
}
//# sourceMappingURL=zahtevZaOslobodjenje.js.map