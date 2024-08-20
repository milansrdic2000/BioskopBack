import { DBBroker } from "../../db/dbBroker.js";
import { buildApiResponse, responseWrapper, } from "../../utils/api-response-util.js";
import { AdministratorSchema } from "./administrator.js";
import bcrypt from "bcrypt";
export const getAllAdministratori = responseWrapper(async (req, res, next) => {
    const result = await DBBroker.getInstance().select(new AdministratorSchema());
    return buildApiResponse(result);
});
export const addAdministrator = responseWrapper(async (req, res, next) => {
    const administrator = req.body;
    const hashedPassword = await bcrypt.hash(administrator.sifra, 10);
    administrator.sifra = hashedPassword;
    const result = await DBBroker.getInstance().insertGeneric(new AdministratorSchema(null, administrator));
    return buildApiResponse(result);
});
export const deleteAdministrator = responseWrapper(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await DBBroker.getInstance().delete(new AdministratorSchema({ id }));
    if (result.rowsAffected[0] === 0) {
        return buildApiResponse("Administrator ne postoji", false, 404);
    }
    return buildApiResponse(result);
});
export const patchAdministrator = responseWrapper(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const administrator = req.body;
    const result = await DBBroker.getInstance().patch(new AdministratorSchema({ id }, administrator));
    if (result.rowsAffected[0] === 0) {
        return buildApiResponse("Administrator ne postoji", false, 404);
    }
    return buildApiResponse(result);
});
//# sourceMappingURL=administratorController.js.map