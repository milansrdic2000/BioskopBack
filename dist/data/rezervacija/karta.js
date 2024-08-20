export class KartaSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "Karta";
        this.tableAlias = "kar";
        this.columns = [
            { name: "korisnikId", getter: "korisnik_id" },
            { name: "projekcijaId", getter: "projekcija_id" },
            {
                name: "kartaId",
                getter: "karta_id",
                autoIncrement: true,
                primaryKey: true,
            },
            { name: "salaId", getter: "sala_id" },
            { name: "sedisteId", getter: "sediste_id" },
        ];
        this.joinKeys = ["korisnik_id", "projekcija_id"];
    }
}
//# sourceMappingURL=karta.js.map