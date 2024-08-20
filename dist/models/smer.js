import { FakultetSchema } from './fakultet.js';
export class SmerSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.primaryKey = 'idSmera';
        this.tableName = 'smer';
        this.tableAlias = 's';
        this.columns = [
            { name: 'idSmera', primaryKey: true },
            { name: 'nazivSmera' },
            { name: 'trajanjeNastave' },
            { name: 'sifraFakulteta', foreignKey: true },
        ];
        this.filter = filter;
        this.payload = payload;
        this.joinKey = ['sifraFakulteta', 'idSmera'];
        this.joinType = 'INNER';
        const fakultet = new FakultetSchema();
        fakultet.joinKey = ['sifraFakulteta'];
        this.joinMeta = [
            {
                joinKeys: ['sifraFakulteta'],
                joinType: 'LEFT',
                subJoin: fakultet,
            },
        ];
        this.insertQuery = ` VALUES(${this.payload?.idSmera},'${this.payload?.nazivSmera}',${this.payload?.trajanjeNastave})`;
        this.updateQuery = ` SET nazivSmera='${this.payload?.nazivSmera}', trajanjeNastave=${this.payload?.trajanjeNastave}`;
    }
}
//# sourceMappingURL=smer.js.map