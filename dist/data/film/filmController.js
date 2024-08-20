import { DBBroker } from "../../db/dbBroker.js";
import { FilmSchema } from "./film.js";
import { buildApiResponse, responseWrapper, } from "../../utils/api-response-util.js";
import { ZanrSchema } from "../zanr/zanr.js";
import { ReziserSchema } from "../reziser/reziser.js";
import { getDbColumn } from "../../models/helper.js";
export const getFilmovi = responseWrapper(async (req, res, next) => {
    const filmSchema = new FilmSchema();
    filmSchema.joinMeta = [];
    if (req.query?.imeZanra) {
        const zanrSchema = new ZanrSchema({
            imeZanra: req.query.imeZanra,
        });
        filmSchema.joinMeta.push({
            subJoin: zanrSchema,
            joinType: "inner",
            joinKeys: ["zanr_Id"],
        });
    }
    if (req.query?.imeRezisera || req.query?.prezimeRezisera) {
        const reziser = {};
        if (req.query?.imeRezisera)
            reziser.ime = req.query.imeRezisera;
        if (req.query?.prezimeRezisera)
            reziser.prezime = req.query.prezimeRezisera;
        const reziserSchema = new ReziserSchema(reziser);
        filmSchema.joinMeta.push({
            subJoin: reziserSchema,
            joinType: "inner",
            joinKeys: ["reziser_Id"],
        });
    }
    if (req.query?.nazivFilma) {
        filmSchema.filter = { nazivFilma: req.query.nazivFilma };
        const filmNameColumn = getDbColumn("nazivFilma", filmSchema);
        filmNameColumn.operator = "LIKE";
        filmNameColumn.rightValue = `'%${req.query.nazivFilma}%'`;
    }
    const result = await DBBroker.getInstance().select(filmSchema);
    return buildApiResponse(FilmSchema.parseDbRow(result), true);
});
export const getFilm = responseWrapper(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await DBBroker.getInstance().select(new FilmSchema({ id }));
    if (result.length === 0) {
        return buildApiResponse("Ne postoji takav film", false, 404);
    }
    return buildApiResponse(FilmSchema.parseDbRow(result[0]), true);
});
export const addFilm = responseWrapper(async (req, res, next) => {
    const film = req.body;
    film.zanrId = film?.zanrId || film?.zanr?.id;
    film.reziserId = film?.reziser?.id;
    film.administratorId = req.user.id;
    const result = await DBBroker.getInstance().insertGeneric(new FilmSchema(null, film));
    return buildApiResponse(result, true);
});
export const patchFilm = responseWrapper(async (req, res, next) => {
    const film = req.body;
    const id = parseInt(req.params.id);
    film.zanrId = film?.zanrId || film?.zanr?.id;
    film.reziserId = film?.reziser?.id;
    film.administratorId = film?.administrator?.id;
    const result = await DBBroker.getInstance().patch(new FilmSchema({ id }, film));
    if (result?.rowsAffected[0] === 0) {
        return buildApiResponse("Ne postoji takav film", false, 404);
    }
    return buildApiResponse(result, true);
});
export const deleteFilm = responseWrapper(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await DBBroker.getInstance().delete(new FilmSchema({ id }));
    if (result?.rowsAffected[0] === 0) {
        return buildApiResponse("Ne postoji takav film", false, 404);
    }
    return buildApiResponse(result, true);
});
//# sourceMappingURL=filmController.js.map