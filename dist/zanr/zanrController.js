import { DBBroker } from "../db/dbBroker.js";
import { buildApiResponse, responseWrapper, } from "../utils/api-response-util.js";
import { ZanrSchema } from "./zanr.js";
export const getAllZanrovi = responseWrapper(async (req, res, next) => {
    const result = await DBBroker.getInstance().select(new ZanrSchema());
    return buildApiResponse(result, true);
});
//# sourceMappingURL=zanrController.js.map