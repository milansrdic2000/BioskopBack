export class StavkaKonkursaSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.joinType = '';
        this.primaryKey = ['sifraKonkursa', 'idStavke'];
        this.autoIncrement = 'idStavke';
        this.tableName = 'stavka_konkursa';
        this.tableAlias = 'sk';
        this.columns = [
            { name: 'idStavke', alias: 'idStavke', primaryKey: true },
            {
                name: 'sifraKonkursa',
                alias: 'sifraKonkursa',
            },
            { name: 'nazivUniverziteta', alias: 'nazivUniverziteta' },
        ];
        this.joinKey = ['sifraKonkursa'];
        this.filter = filter;
        this.payload = payload;
        this.insertQuery = ` (sifraKonkursa, nazivUniverziteta) VALUES('${this.payload?.sifraKonkursa}','${this.payload?.nazivUniverziteta}')`;
    }
}
//# sourceMappingURL=stavkaKonkursa.js.map