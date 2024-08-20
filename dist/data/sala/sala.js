import { SedisteSchema } from "./sediste.js";
export class SalaSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "BioskopskaSala";
        this.tableAlias = "bs";
        this.columns = [
            { name: "id", autoIncrement: true, primaryKey: true },
            { name: "nazivSale", getter: "naziv_sale" },
        ];
        this.autoIncrement = "id";
        this.joinKeys = ["id"];
        this.joinMeta = [
            {
                subJoin: new SedisteSchema(),
                joinType: "LEFT",
                joinKeys: ["id"],
            },
        ];
    }
    static parseDbRow(rows) {
        const salaMap = new Map();
        rows.forEach((row) => {
            const { sala, id, idSale, idSedista, kolona, nazivSale, red } = row;
            const sediste = {
                idSedista,
                idSale,
                kolona,
                red,
            };
            if (!salaMap.has(idSale)) {
                const newSala = {
                    id: id,
                    nazivSale,
                    listaSedista: [],
                };
                if (idSedista)
                    newSala.listaSedista.push(sediste);
                salaMap.set(idSale, newSala);
            }
            else {
                salaMap.get(idSale).listaSedista.push(sediste);
            }
        });
        return Array.from(salaMap.values());
    }
}
//# sourceMappingURL=sala.js.map