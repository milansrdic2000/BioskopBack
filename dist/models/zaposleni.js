export class ZaposleniSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.tableName = "zaposleni";
        this.primaryKey = "jmbg";
        this.columns = [
            { name: "jmbg", type: "number", primaryKey: true },
            { name: "imePrezime", type: "string" },
        ];
        this.insertQuery = `INSERT INTO zaposleni (jmbg, imePrezime) VALUES (${this.payload?.jmbg}, '${this.payload?.imePrezime}')`;
        this.updateQuery = `UPDATE zaposleni SET imePrezime = '${this.payload?.imePrezime}' WHERE jmbg = ${this.payload?.jmbg}`;
        this.joinKey = ["jmbg"];
        this.joinType = "";
        this.joinMeta = [];
        this.getDatabaseColumnName = (name) => name;
    }
}
//# sourceMappingURL=zaposleni.js.map