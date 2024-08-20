import {
  ColumnSchema,
  EntitySchema,
  JoinMeta,
} from "../../models/entitySchema.js";
import { Sediste, SedisteSchema } from "./sediste.js";

export interface Sala {
  id?: number;
  nazivSale?: string;
  listaSedista?: Sediste[];
}
export class SalaSchema implements EntitySchema<Sala> {
  primaryKey: string | string[];
  tableName = "BioskopskaSala";
  tableAlias = "bs";
  columns: ColumnSchema<Sala>[] = [
    { name: "id", autoIncrement: true, primaryKey: true },
    { name: "nazivSale", getter: "naziv_sale" },
  ];
  autoIncrement = "id";
  joinKeys?: string[] = ["id"];
  joinMeta: JoinMeta[] = [
    {
      subJoin: new SedisteSchema(),
      joinType: "LEFT",
      joinKeys: ["id"],
    },
  ];
  constructor(public filter?: Sala, public payload?: Sala) {}

  static parseDbRow?(rows: (Sala & Sediste)[]) {
    const salaMap = new Map<number, Sala>();

    rows.forEach((row) => {
      const { sala, id, idSale, idSedista, kolona, nazivSale, red } = row;
      const sediste: Sediste = {
        idSedista,
        idSale,
        kolona,
        red,
      };
      if (!salaMap.has(idSale)) {
        const newSala: Sala = {
          id: id,
          nazivSale,
          listaSedista: [],
        };
        if (idSedista) newSala.listaSedista.push(sediste);
        salaMap.set(idSale, newSala);
      } else {
        salaMap.get(idSale).listaSedista.push(sediste);
      }
    });
    return Array.from(salaMap.values());
  }
}
