import { DBBroker } from "../../db/dbBroker.js";
import { buildApiResponse, responseWrapper, } from "../../utils/api-response-util.js";
import { KorisnikSchema } from "./korisnik.js";
import bcrypt from "bcrypt";
export const getAllKorisnici = responseWrapper(async (req, res) => {
    const result = await DBBroker.getInstance().select(new KorisnikSchema());
    return buildApiResponse(result);
});
export const deleteKorisnik = responseWrapper(async (req, res) => {
    const id = parseInt(req.params.id);
    const tokenId = req.user.id;
    if (id !== tokenId)
        return buildApiResponse("Nemate pravo da obrisete drugog korisnika", false, 403);
    const result = await DBBroker.getInstance().delete(new KorisnikSchema({ id }));
    if (result.rowsAffected[0] === 0)
        throw new Error("Korisnik not found");
    return buildApiResponse(result);
});
export const addKorisnik = responseWrapper(async (req, res) => {
    const korisnik = req.body;
    const hashedPassword = await bcrypt.hash(korisnik.sifra, 10);
    korisnik.sifra = hashedPassword;
    const result = await DBBroker.getInstance().insertGeneric(new KorisnikSchema(null, korisnik));
    return buildApiResponse(result);
});
export const patchKorisnik = responseWrapper(async (req, res) => {
    const id = parseInt(req.params.id);
    const tokenId = req.user.id;
    if (id !== tokenId)
        return buildApiResponse("Nemate pravo da menjate drugog korisnika", false, 403);
    const korisnik = req.body;
    if (korisnik.sifra) {
        const hashedPassword = await bcrypt.hash(korisnik.sifra, 10);
        korisnik.sifra = hashedPassword;
    }
    const result = await DBBroker.getInstance().patch(new KorisnikSchema({ id }, korisnik));
    if (result.rowsAffected[0] === 0)
        throw new Error("Korisnik not found");
    return buildApiResponse(result);
});
//# sourceMappingURL=korisnikController.js.map