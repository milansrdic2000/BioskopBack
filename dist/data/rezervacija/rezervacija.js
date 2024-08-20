import { KorisnikSchema } from "../korisnik/korisnik.js";
import { ProjekcijaSchema } from "../projekcije/projekcija.js";
import { KartaSchema } from "./karta.js";
export class RezervacijaSchema {
    constructor(filter, payload) {
        this.filter = filter;
        this.payload = payload;
        this.tableName = "Rezervacija";
        this.tableAlias = "r";
        this.columns = [
            { name: "korisnikId", getter: "korisnik_id" },
            { name: "projekcijaId", getter: "projekcija_id" },
            { name: "datumRezervacije", getter: "datum_rezervacije" },
        ];
        this.joinMeta = [
            {
                joinKeys: ["korisnik_id"],
                subJoin: new KorisnikSchema(),
            },
            { joinKeys: ["projekcija_id"], subJoin: new ProjekcijaSchema() },
            {
                joinKeys: ["korisnik_id", "projekcija_id"],
                subJoin: new KartaSchema(),
            },
        ];
    }
    static parseDbRow(rows) {
        const rezervacijaUnique = new Map();
        rows.forEach((row) => {
            row.salaId = row.salaId[0];
            row.projekcijaId = row.projekcijaId[0];
            row.korisnikId = row.korisnikId[0];
            const { email, ime, prezime, korisnikId, datumRezervacije, projekcijaId, salaId, sedisteId, } = row;
            const { kartaId } = row;
            const rezervacija = rezervacijaUnique.get(`${projekcijaId},${korisnikId}`);
            if (rezervacija) {
                rezervacija.listaKarata.push({
                    kartaId,
                    korisnikId,
                    projekcijaId,
                    sedisteId,
                    salaId,
                });
            }
            else {
                const newRez = {
                    datumRezervacije,
                    listaKarata: [
                        {
                            kartaId,
                            korisnikId,
                            projekcijaId,
                            sedisteId,
                            salaId,
                        },
                    ],
                    projekcijaId,
                    salaId,
                    sedisteId,
                    korisnik: {
                        id: korisnikId,
                        email,
                        ime,
                        prezime,
                    },
                    korisnikId,
                    projekcija: {
                        ...ProjekcijaSchema.parseDbSingleRow(row),
                        id: projekcijaId,
                    },
                };
                rezervacijaUnique.set(`${projekcijaId},${korisnikId}`, newRez);
            }
        });
        return Array.from(rezervacijaUnique.values());
    }
}
//# sourceMappingURL=rezervacija.js.map