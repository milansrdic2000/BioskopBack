import { formatDate } from "../utils/date-helper.js";
export class RataSchema {
    getDatabaseColumnName(arg0) {
        const column = this.columns.filter((column) => column.name === arg0)[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    }
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.joinKey = ["idPrograma"];
        this.primaryKey = ["idPrograma", "rbRate"];
        this.tableName = "rata";
        this.tableAlias = "rata";
        this.columns = [
            { name: "idPrograma", primaryKey: true, foreignKey: true },
            { name: "rbRate", primaryKey: true },
            { name: "datumIsplate" },
            { name: "kolicina" },
        ];
        this.filter = filter;
        this.payload = payload;
        const datumIsplate = this.payload?.datumIsplate
            ? `'${formatDate(this.payload.datumIsplate)}'`
            : null;
        this.insertQuery = ` (idPrograma,datumisplate,kolicina) VALUES (${this.payload?.idPrograma},${datumIsplate},${this.payload?.kolicina})`;
    }
}
//# sourceMappingURL=rata.js.map