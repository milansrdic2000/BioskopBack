export class OpstinaSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = ["postanskiBroj", "idMesta"];
        this.tableName = "opstina";
        this.tableAlias = "o";
        this.columns = [
            { name: "postanskiBroj", primaryKey: true },
            { name: "nazivOpstine" },
            {
                name: "nazivMesta",
            },
            { name: "idMesta", primaryKey: true },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = ["idMesta", "postanskiBroj"];
        this.joinType = "LEFT";
        this.joinMeta = [];
        this.insertQuery = ` (postanskiBroj, nazivOpstine, idMesta) VALUES(${this.payload?.postanskiBroj},'${this.payload?.nazivOpstine}',${this.payload?.idMesta})`;
        this.updateQuery = ` SET naziv='${this.payload?.nazivOpstine}', idMesta=${this.payload?.idMesta}`;
    }
}
//# sourceMappingURL=opstina.js.map