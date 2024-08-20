import { DBBroker } from "../../db/dbBroker.js";
import { getDbColumn } from "../../models/helper.js";
import { buildApiResponse, responseWrapper, } from "../../utils/api-response-util.js";
import { ProjekcijaSchema } from "./projekcija.js";
export const getProjekcije = responseWrapper(async (req, res) => {
    const projekcijaSchema = new ProjekcijaSchema();
    if (req.query.future) {
        projekcijaSchema.filter = {};
        const datumColumn = getDbColumn("datumProjekcije", projekcijaSchema);
        datumColumn.operator = ">=";
        projekcijaSchema.filter.datumProjekcije = new Date();
        projekcijaSchema.filter.datumProjekcije.setHours(0, 0, 0, 0);
    }
    if (req.query.nazivFilma) {
        projekcijaSchema.joinMeta[1].subJoin.filter = {
            nazivFilma: req.query.nazivFilma,
        };
        const filmNameColumn = getDbColumn("nazivFilma", projekcijaSchema.joinMeta[1].subJoin);
        filmNameColumn.operator = "LIKE";
        filmNameColumn.rightValue = `'%${req.query.nazivFilma}%'`;
    }
    const result = await DBBroker.getInstance().select(projekcijaSchema);
    console.log(result.length);
    return buildApiResponse(ProjekcijaSchema.parseDbRow(result));
});
export const getProjekcija = responseWrapper(async (req, res) => {
    const projekcijaSchema = new ProjekcijaSchema();
    const id = parseInt(req.params.id);
    projekcijaSchema.filter = { id };
    const result = await DBBroker.getInstance().select(projekcijaSchema);
    console.log(result.length);
    return buildApiResponse(ProjekcijaSchema.parseDbRow(result)[0]);
});
export const addProjekcije = responseWrapper(async (req, res) => {
    const projekcija = req.body;
    const result = await DBBroker.getInstance().insertGeneric(new ProjekcijaSchema(null, projekcija));
    return buildApiResponse(result);
});
export const deleteProjekcije = responseWrapper(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await DBBroker.getInstance().delete(new ProjekcijaSchema({ id }));
    if (result.rowsAffected[0] === 0) {
        return buildApiResponse("Projekcija ne postoji", false, 404);
    }
    return buildApiResponse(result);
});
export const patchProjekcija = responseWrapper(async (req, res) => {
    const id = parseInt(req.params.id);
    const projekcija = req.body;
    delete projekcija.id;
    const result = await DBBroker.getInstance().patch(new ProjekcijaSchema({ id }, projekcija));
    if (result.rowsAffected[0] === 0) {
        return buildApiResponse("Projekcija ne postoji", false, 404);
    }
    return buildApiResponse(result);
});
//# sourceMappingURL=projekcijaController.js.map