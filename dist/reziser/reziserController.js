import { DBBroker } from "../db/dbBroker.js";
import { buildApiResponse, responseWrapper, } from "../utils/api-response-util.js";
import { ReziserSchema } from "./reziser.js";
export const getAllReziseri = responseWrapper(async (req, res, next) => {
    const result = await DBBroker.getInstance().select(new ReziserSchema());
    return buildApiResponse(result, true);
});
export const addReziser = responseWrapper(async (req, res, next) => {
    const reziser = req.body;
    const result = await DBBroker.getInstance().insertGeneric(new ReziserSchema(null, reziser));
    return buildApiResponse(result, true);
});
export const deleteReziser = responseWrapper(async (req, res, next) => {
    const reziserId = parseInt(req.params.id);
    const result = await DBBroker.getInstance().delete(new ReziserSchema({ id: reziserId }));
    return buildApiResponse(result, true);
});
//# sourceMappingURL=reziserController.js.map