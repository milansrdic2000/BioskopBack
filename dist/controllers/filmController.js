import { DBBroker } from "../db/dbBroker.js";
import { FilmSchema } from "../models/film.js";
import { buildApiResponse, responseWrapper, } from "../utils/api-response-util.js";
export const getFilmovi = responseWrapper(async (req, res, next) => {
    const result = await DBBroker.getInstance().select(new FilmSchema());
    return buildApiResponse(result, true);
});
//# sourceMappingURL=filmController.js.map