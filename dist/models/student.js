import { formatDate } from "../utils/date-helper.js";
import { OpstinaSchema } from "./opstina.js";
export class StudentSchema {
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.basicColumns = [
            { name: "jmbg", primaryKey: true },
            { name: "imePrezime" },
            { name: "sifraFakulteta", foreignKey: true },
            { name: "idSmera", foreignKey: true },
        ];
        this.advandedColumns = [
            { name: "jmbg", primaryKey: true },
            // { name: 'imePrezime' },
            { name: "adresa" },
            { name: "vojniRokOd" },
            { name: "vojniRokDo" },
            { name: "idMesta", foreignKey: true },
            { name: "postanskiBroj", foreignKey: true },
            { name: "registarskiBroj", foreignKey: false },
        ];
        this.primaryKey = "jmbg";
        this.tableName = "student_detalji";
        this.tableAlias = "st";
        this.columns = this.advandedColumns;
        this.filter = filter;
        this.payload = payload;
        this.joinMeta = [
            {
                joinKeys: ["idMesta", "postanskiBroj"],
                joinType: "LEFT",
                subJoin: new OpstinaSchema(),
            },
            // {
            //   joinKeys: ['sifraFakulteta', 'idSmera'],
            //   joinType: 'LEFT',
            //   subJoin: new SmerSchema(),
            // },
        ];
        const vojniRokOd = this.payload?.vojniRokOd
            ? `'${formatDate(this.payload?.vojniRokOd)}'`
            : null;
        const vojniRokDo = this.payload?.vojniRokDo
            ? `'${formatDate(this.payload?.vojniRokDo)}'`
            : null;
        this.joinKey = ["idMesta", "postanskiBroj", "sifraFakulteta", "idSmera"];
        this.insertQuery = ` VALUES(${this.payload?.jmbg},'${this.payload?.imePrezime}','${this.payload?.sifraFakulteta}','${this.payload?.idSmera}','${this.payload?.adresa}',${vojniRokOd},${vojniRokDo},${this.payload?.idMesta},${this.payload?.postanskiBroj},${this.payload?.registarskiBroj})`;
        this.updateQuery = ` SET imePrezime='${this.payload?.imePrezime}', adresa='${this.payload?.adresa}', vojniRokOd=${vojniRokOd}, vojniRokDo=${vojniRokDo}, idMesta=${this.payload?.idMesta}, sifraFakulteta='${this.payload?.sifraFakulteta}'`;
        this.minimalColumns = [
            { name: "jmbg", primaryKey: true },
            { name: "imePrezime" },
        ];
    }
}
export const parseStudentRow = (row) => {
    const { adresa, jmbg, imePrezime, vojniRokOd, vojniRokDo, idMesta, postanskiBroj, nazivMesta, nazivOpstine, nazivSmera, nazivFakulteta, idSmera, sifraFakulteta, idMestaFakultet, trajanjeNastave, registarskiBroj, } = row;
    const mesto = {
        idMesta,
        nazivMesta,
    };
    const opstina = {
        idMesta,
        nazivOpstine,
        nazivMesta,
        postanskiBroj,
    };
    const fakultet = {
        idMestaFakultet,
        nazivFakulteta,
        sifraFakulteta,
    };
    const smer = {
        idSmera,
        nazivSmera,
        trajanjeNastave,
        sifraFakulteta,
        fakultet,
    };
    const s = {
        adresa,
        jmbg,
        imePrezime,
        vojniRokOd,
        vojniRokDo,
        opstina,
        smer,
        registarskiBroj,
    };
    return s;
};
//# sourceMappingURL=student.js.map