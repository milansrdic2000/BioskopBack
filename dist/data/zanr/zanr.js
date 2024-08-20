export class ZanrSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "zanr";
        this.tableAlias = "zr";
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
                name: "imeZanra",
                getter: "ime_zanra",
                required: true,
            },
        ];
    }
}
//# sourceMappingURL=zanr.js.map