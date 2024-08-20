import { ZaposleniSchema } from "./zaposleni.js";
export class KomisijaSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.tableName = "komisija";
        this.tableAlias = "komisija";
        this.primaryKey = "idKomisije";
        this.columns = [
            { name: "idKomisije", type: "number", primaryKey: true },
            { name: "vodja", type: "number", getter: "vodja" },
            { name: "naziv", type: "string" },
        ];
        this.insertQuery = ` (vodja, naziv) VALUES (${this.payload?.vodja}, '${this.payload?.naziv}')`;
        this.updateQuery = `UPDATE komisija SET idVodje = ${this.payload?.vodja}, naziv = '${this.payload?.naziv}' WHERE idKomisije = ${this.payload?.idKomisije}`;
        this.joinKey = ["idKomisije"];
        this.joinType = "LEFT JOIN";
        this.joinMeta = [
            {
                subJoin: new ZaposleniSchema(),
                joinKeys: ["vodja"],
                joinType: "LEFT",
            },
        ];
        this.getDatabaseColumnName = (name) => name;
    }
}
//# sourceMappingURL=komisija.js.map