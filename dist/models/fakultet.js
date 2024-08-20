export class FakultetSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = 'sifraFakulteta';
        this.tableName = 'fakultet';
        this.tableAlias = 'f';
        this.columns = [
            { name: 'nazivFakulteta' },
            { name: 'sifraFakulteta', primaryKey: true },
            { name: 'idMestaFakultet', foreignKey: true, getter: 'idMesta' },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = ['idMesta'];
        this.insertQuery = ` VALUES('${this.payload?.nazivFakulteta}','${this.payload?.sifraFakulteta}',${this.payload?.idMestaFakultet})`;
        this.updateQuery = ` SET nazivFakulteta='${this.payload?.nazivFakulteta}', idMesta=${this.payload?.idMestaFakultet}`;
    }
}
//# sourceMappingURL=fakultet.js.map