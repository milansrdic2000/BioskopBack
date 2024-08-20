import { DBBroker } from "../../db/dbBroker.js";
import { buildApiResponse, responseWrapper, } from "../../utils/api-response-util.js";
import { ZanrSchema } from "./zanr.js";
export const getAllZanrovi = responseWrapper(async (req, res, next) => {
    const result = await DBBroker.getInstance().select(new ZanrSchema());
    return buildApiResponse(result, true);
});
export const addZanr = responseWrapper(async (req, res, next) => {
    const zanr = req.body;
    const result = await DBBroker.getInstance().insertGeneric(new ZanrSchema(null, zanr));
    return buildApiResponse(result, true);
});
export const deleteZanr = responseWrapper(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await DBBroker.getInstance().delete(new ZanrSchema({ id }));
    if (result.rowsAffected[0] === 0) {
        return buildApiResponse("Zanr ne postoji", false, 404);
    }
    return buildApiResponse(result, true);
});
export const patchZanr = responseWrapper(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const zanr = req.body;
    const result = await DBBroker.getInstance().patch(new ZanrSchema({ id }, zanr));
    if (result.rowsAffected[0] === 0) {
        return buildApiResponse("Zanr ne postoji", false, 404);
    }
    return buildApiResponse(result, true);
});
//# sourceMappingURL=zanrController.js.map