export class MestoSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = "idMesta";
        this.tableName = "mesto";
        this.tableAlias = "m";
        this.columns = [
            { name: "idMesta", primaryKey: true },
            { name: "nazivMesta" },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = ["idMesta"];
        this.insertQuery = ` (nazivMesta) VALUES('${this.payload?.nazivMesta}')`;
        this.updateQuery = ` SET naziv='${this.payload?.nazivMesta}'`;
    }
}
//# sourceMappingURL=mesto.js.map