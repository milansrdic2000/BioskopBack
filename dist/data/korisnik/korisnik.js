export class KorisnikSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "korisnik";
        this.tableAlias = "ko";
        this.primaryKey = "id";
        this.autoIncrement = "id";
        this.joinKeys = ["id"];
        this.columns = [
            {
                name: "id",
                primaryKey: true,
                required: true,
                autoIncrement: true,
            },
            {
                name: "email",
                required: true,
            },
            {
                name: "sifra",
                required: true,
                hide: true,
            },
            {
                name: "ime",
                required: true,
            },
            {
                name: "prezime",
                required: true,
            },
            {
                name: "datumRodjenja",
                getter: "datum_rodjenja",
                required: true,
            },
        ];
    }
}
//# sourceMappingURL=korisnik.js.map