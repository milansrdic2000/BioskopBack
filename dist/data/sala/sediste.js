export class SedisteSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "Sediste";
        this.tableAlias = "sed";
        this.columns = [
            { name: "idSale", getter: "sala_id", primaryKey: true },
            {
                name: "idSedista",
                getter: "sediste_id",
                primaryKey: true,
                autoIncrement: true,
            },
            { name: "red" },
            { name: "kolona" },
        ];
        this.joinKeys = ["sala_id"];
    }
}
//# sourceMappingURL=sediste.js.map