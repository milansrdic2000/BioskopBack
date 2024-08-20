export class OsetljivaGrupaSchema {
    getDatabaseColumnName(arg0) {
        const column = this.columns.filter((column) => column.name === arg0)[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    }
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.joinKey = ["idGrupe"];
        this.primaryKey = "idGrupe";
        this.tableName = "osetljiva_Grupa";
        this.tableAlias = "og";
        this.columns = [
            { name: "idGrupe", primaryKey: true },
            { name: "nazivGrupe" },
            { name: "brojPoena", getter: "brojpoena.get_grupa_broj_poena()" },
        ];
        this.filter = filter;
        this.payload = payload;
    }
}
//# sourceMappingURL=osetljivaGrupa.js.map