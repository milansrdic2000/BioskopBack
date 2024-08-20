import { formatDate } from "../utils/date-helper.js";
import { StavkaKonkursaSchema } from "./stavkaKonkursa.js";
export class KonkursSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = "sifraKonkursa";
        this.joinKey = ["sifraKonkursa"];
        this.tableName = "konkurs";
        this.tableAlias = "k";
        this.columns = [
            { name: "sifraKonkursa", alias: "sifraKonkursa", primaryKey: true },
            { name: "skolskaGodina", alias: "skolskaGodina" },
            { name: "datumOd", getter: "konkursinfo.get_datum_od()" },
            { name: "datumDo", getter: "konkursinfo.get_datum_do()" },
            { name: "brojMesta", getter: "konkursinfo.get_broj_mesta()" },
        ];
        this.filter = filter;
        this.payload = payload;
        const datumOd = this.payload?.datumOd
            ? formatDate(this.payload?.datumOd)
            : null;
        const datumDo = this.payload?.datumDo
            ? formatDate(this.payload?.datumDo)
            : null;
        this.joinMeta = [
            {
                joinType: "LEFT",
                joinKeys: ["sifraKonkursa"],
                subJoin: new StavkaKonkursaSchema(),
            },
        ];
        this.insertQuery = ` VALUES('${this.payload?.sifraKonkursa}','${this.payload?.skolskaGodina}',konkurs_info('${datumOd}','${datumDo}',${this.payload?.brojMesta}))`;
        this.updateQuery = ` SET skolskaGodina='${this.payload?.skolskaGodina}', konkursinfo=konkurs_info('${datumOd}','${datumDo}',${this.payload?.brojMesta})`;
    }
}
//# sourceMappingURL=konkurs.js.map