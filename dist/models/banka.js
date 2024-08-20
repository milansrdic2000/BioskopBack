export class BankaSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = "sifraBanke";
        this.tableName = "banka";
        this.tableAlias = "banka";
        this.columns = [
            { name: "sifraBanke", primaryKey: true },
            { name: "nazivBanke", getter: "naziv" },
        ];
        this.filter = filter;
        this.payload = payload;
        this.insertQuery = `INSERT INTO ${this.tableName} (${(this.payload?.sifraBanke, this.payload?.nazivBanke)}) VALUES ('${this.payload?.sifraBanke}', '${this.payload?.nazivBanke}')`;
        this.updateQuery = `UPDATE ${this.tableName} SET naziv='${this.payload?.nazivBanke}'`;
    }
}
//# sourceMappingURL=banka.js.map