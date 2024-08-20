export class ReziserSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "reziser";
        this.tableAlias = "re";
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
                name: "ime",
                getter: "ime",
                required: true,
            },
            {
                name: "prezime",
                getter: "prezime",
                required: true,
            },
        ];
    }
}
//# sourceMappingURL=reziser.js.map