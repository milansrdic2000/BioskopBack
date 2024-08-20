import { OsetljivaGrupaSchema } from "./osetljivaGrupa.js";
import { StudentSchema } from "./student.js";
import { UgovorSchema } from "./ugovor.js";
export class PrijavaSchema {
    getDatabaseColumnName(arg0) {
        const column = this.columns.filter((column) => column.name === arg0)[0];
        if (!column)
            return null;
        return column.getter ? column.getter : arg0;
    }
    constructor(payload = null, filter = null) {
        this.payload = payload;
        this.filter = filter;
        this.joinKey = ["idPrijave"];
        this.primaryKey = "idPrijave";
        this.tableName = "prijava";
        this.tableAlias = "p";
        this.columns = [
            { name: "idPrijave", primaryKey: true },
            { name: "jmbg" },
            { name: "sifraKonkursa" },
            { name: "idGrupe" },
            { name: "brojUgovora" },
            { name: "prosecnaOcena" },
            { name: "primanja" },
            { name: "espb" },
        ];
        const student = new StudentSchema();
        student.tableName = "student_osnovno";
        student.joinMeta = [];
        student.columns = student.basicColumns;
        student.joinKey = ["jmbg"];
        this.joinMeta = [
            {
                joinKeys: ["idGrupe"],
                joinType: "LEFT",
                subJoin: new OsetljivaGrupaSchema(),
            },
            {
                joinKeys: ["brojUgovora"],
                joinType: "LEFT",
                subJoin: new UgovorSchema(),
            },
            {
                joinKeys: ["jmbg"],
                joinType: "LEFT",
                subJoin: student,
            },
        ];
        this.filter = filter;
        this.payload = payload;
        this.insertQuery = `(jmbg, sifraKonkursa, idGrupe, brojUgovora, prosecnaOcena, primanja, espb) VALUES (${this.payload?.student?.jmbg}, '${this.payload?.konkurs?.sifraKonkursa}', ${this.payload?.grupa?.idGrupe}, ${this.payload?.ugovor?.brojUgovora}, ${this.payload?.prosecnaOcena},${this.payload?.primanja}, ${this.payload?.espb})`;
    }
}
//# sourceMappingURL=prijava.js.map