export class FilmSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "film";
        this.tableAlias = "fi";
        this.primaryKey = "id";
        this.autoIncrement = "id";
        this.columns = [
            {
                name: "id",
                primaryKey: true,
                required: true,
            },
            {
                name: "nazivFilma",
                getter: "naziv_filma",
                required: true,
            },
            {
                name: "opisFilma",
                getter: "opis_filma",
                required: true,
            },
            {
                name: "trajanje",
                getter: "trajanje_u_minutima",
                required: true,
            },
            {
                name: "datumPremijere",
                getter: "datum_premijere",
                required: true,
            },
            {
                name: "reziserId",
                getter: "reziser_id",
                required: true,
            },
            {
                name: "zanrId",
                getter: "zanr_id",
                required: true,
            },
            {
                name: "administratorId",
                getter: "administrator_id",
                required: true,
            },
        ];
        this.insertQuery = `(naziv_filma, opis_filma, trajanje_u_minutima, datum_premijere, reziser_id, zanr_id, administrator_id) VALUES (:id, :nazivFilma, :opisFilma, :trajanje, :datumPremijere, :reziserId, :zanrId, :administratorId)`;
    }
}
//# sourceMappingURL=film.js.map