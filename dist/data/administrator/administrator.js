export class AdministratorSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.columns = [
            {
                name: "id",
                primaryKey: true,
                required: true,
                autoIncrement: true,
            },
            {
                name: "email",
                required: true,
            },
            {
                name: "sifra",
                required: true,
                hide: true,
            },
            {
                name: "ime",
                required: true,
            },
            {
                name: "prezime",
                required: true,
            },
        ];
        this.joinKeys = ["id"];
        this.tableName = "administrator";
        this.tableAlias = "ad";
        this.primaryKey = "id";
        this.autoIncrement = "id";
    }
}
//# sourceMappingURL=administrator.js.map