import { DBBroker } from "../../db/dbBroker.js";
import { buildApiResponse, responseWrapper, } from "../../utils/api-response-util.js";
import { KartaSchema } from "./karta.js";
import { RezervacijaSchema } from "./rezervacija.js";
export const getRezervacije = responseWrapper(async (req, res) => {
    const rezervacijaSchema = new RezervacijaSchema();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const idKorisnika = req.query?.idKorisnika || req.user.id;
    if (idKorisnika) {
        rezervacijaSchema.filter = {};
        rezervacijaSchema.filter.korisnikId = parseInt(idKorisnika);
    }
    if (req.query.idProjekcije) {
        rezervacijaSchema.filter = {};
        rezervacijaSchema.filter.projekcijaId = parseInt(req.query.idProjekcije);
    }
    let result = await DBBroker.getInstance().select(rezervacijaSchema);
    result = RezervacijaSchema.parseDbRow(result);
    result = result.slice((page - 1) * pageSize, page * pageSize);
    return buildApiResponse(result);
});
export const addRezervacija = responseWrapper(async (req, res) => {
    const { idKorisnika, idProjekcije, listaKarata, } = req.body;
    const kartaSchema = new KartaSchema();
    const rezervacijaSchema = new RezervacijaSchema();
    let result;
    await DBBroker.getInstance().beginTransaction();
    const id = req.user.id;
    console.log(id);
    rezervacijaSchema.payload = {
        korisnikId: id,
        projekcijaId: idProjekcije,
        datumRezervacije: new Date(),
    };
    result = await DBBroker.getInstance().insertGeneric(rezervacijaSchema);
    if (result?.rowsAffected[0] === 0) {
        await DBBroker.getInstance().rollback();
        return buildApiResponse("Rezervacija nije dodata", false, 400);
    }
    for (let karta of listaKarata) {
        kartaSchema.payload = {
            korisnikId: id,
            projekcijaId: idProjekcije,
            sedisteId: karta.sedisteId,
            salaId: karta.salaId,
        };
        result = await DBBroker.getInstance().insertGeneric(kartaSchema);
        if (result?.rowsAffected[0] === 0) {
            await DBBroker.getInstance().rollback();
            return buildApiResponse("Karta nije dodata", false, 400);
        }
    }
    return buildApiResponse(result);
});
export const patchRezervacija = responseWrapper(async (req, res) => {
    const { idKorisnika, idProjekcije, listaKarata, } = req.body;
    const id = req.user.id;
    if (idKorisnika !== id) {
        return buildApiResponse("Nemate pravo pristupa", false, 403);
    }
    const kartaSchema = new KartaSchema();
    let result;
    await DBBroker.getInstance().beginTransaction();
    for (let karta of listaKarata) {
        if (karta.operation === "ADD") {
            kartaSchema.payload = {
                korisnikId: idKorisnika,
                projekcijaId: idProjekcije,
                sedisteId: karta.sedisteId,
                salaId: karta.salaId,
            };
            result = await DBBroker.getInstance().insertGeneric(kartaSchema);
        }
        else if (karta.operation === "DELETE") {
            kartaSchema.filter = { kartaId: karta.kartaId };
            result = await DBBroker.getInstance().delete(kartaSchema);
        }
        else {
            throw new Error("Losa operacija za karte");
        }
        if (result?.rowsAffected[0] === 0) {
            await DBBroker.getInstance().rollback();
            return buildApiResponse("Karta nije dodata", false, 400);
        }
    }
    return buildApiResponse(result);
});
export const deleteRezervacija = responseWrapper(async (req, res) => {
    const { korisnikId, projekcijaId } = req.query;
    const id = req.user.id;
    if (korisnikId != id) {
        return buildApiResponse("Nemate pravo pristupa", false, 403);
    }
    const result = await DBBroker.getInstance().delete(new RezervacijaSchema({
        korisnikId: parseInt(korisnikId),
        projekcijaId: parseInt(projekcijaId),
    }));
    if (result.rowsAffected[0] === 0)
        return buildApiResponse("Rezervacija nije pronadjena", false, 404);
    return buildApiResponse(result);
});
//# sourceMappingURL=rezervacijaController.js.map