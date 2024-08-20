import { formatDate } from "../utils/date-helper.js";
export class UgovorSchema {
    getDatabaseColumnName(arg0) {
        const column = this.columns.filter((column) => column.name === arg0)[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    }
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.joinKey = ["brojUgovora"];
        this.primaryKey = "brojUgovora";
        this.tableName = "ugovor";
        this.tableAlias = "ug";
        this.columns = [
            { name: "brojUgovora", primaryKey: true },
            { name: "datumUgovora", getter: "datum" },
        ];
        this.filter = filter;
        this.payload = payload;
        const datumUgovora = this.payload?.datumUgovora
            ? formatDate(new Date(this.payload?.datumUgovora))
            : null;
        this.insertQuery = `(brojUgovora, datum) VALUES (${this.payload?.brojUgovora}, '${datumUgovora}')`;
    }
}
//# sourceMappingURL=ugovor.js.map