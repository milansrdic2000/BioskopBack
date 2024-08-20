import { DBBroker } from "../../db/dbBroker.js";
import { getDbColumn } from "../../models/helper.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../../utils/api-response-util.js";
import { SalaSchema } from "./sala.js";
import { Sediste, SedisteSchema } from "./sediste.js";

export const getSale = responseWrapper(async (req, res) => {
  const salaSchema = new SalaSchema();
  salaSchema.joinMeta = [];
  if (req.query?.nazivSale) {
    salaSchema.filter = { nazivSale: req.query.nazivSale as string };
    const salaNameColumn = getDbColumn("nazivSale", salaSchema);
    salaNameColumn.operator = "LIKE";
    salaNameColumn.rightValue = `'%${req.query.nazivSale}%'`;
  }
  const result = await DBBroker.getInstance().select(salaSchema);
  return buildApiResponse(result);
});
export const getSala = responseWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await DBBroker.getInstance().select(
    new SalaSchema({ id: parseInt(id) })
  );
  if (result.length === 0) throw new Error("Sala not found");

  return buildApiResponse(SalaSchema.parseDbRow(result)[0]);
});
export const addSala = responseWrapper(async (req, res) => {
  const { nazivSale, listaSedista } = req.body;

  await DBBroker.getInstance().beginTransaction();

  const result = await DBBroker.getInstance().insertGeneric(
    new SalaSchema(null, req.body)
  );

  if (result.recordset?.length > 0) {
    const idSale = result.recordset[0].id;

    for (let sediste of listaSedista) {
      sediste.idSale = idSale;
      await DBBroker.getInstance().insertGeneric(
        new SedisteSchema(null, sediste)
      );
    }
  } else throw new Error("Sala not inserted..");
  return buildApiResponse(result);
});
export const deleteSala = responseWrapper(async (req, res) => {
  await DBBroker.getInstance().beginTransaction();
  const { id } = req.params;
  const result = await DBBroker.getInstance().delete(
    new SalaSchema({ id: parseInt(id) })
  );
  return buildApiResponse(result);
});
export const patchSala = responseWrapper(async (req, res) => {
  const { id } = req.params;
  await DBBroker.getInstance().beginTransaction();
  const { listaSedista }: { listaSedista: Sediste[] } = req.body;
  delete req.body.listaSedista;
  delete req.body.id;
  const result = await DBBroker.getInstance().patch(
    new SalaSchema({ id: parseInt(id) }, req.body)
  );
  for (let sediste of listaSedista) {
    if (sediste.operation === "DELETE") {
      await DBBroker.getInstance().delete(
        new SedisteSchema({ idSedista: sediste.idSedista })
      );
    } else if (sediste.operation === "ADD") {
      sediste.idSale = parseInt(id);
      await DBBroker.getInstance().insertGeneric(
        new SedisteSchema(null, sediste)
      );
    }
  }
  return buildApiResponse(result);
});

// SEDISTA
export const addSediste = responseWrapper(async (req, res) => {
  const sediste = req.body;
  sediste.idSale = parseInt(req.params.id);
  const result = await DBBroker.getInstance().insertGeneric(
    new SedisteSchema(null, sediste)
  );
  return buildApiResponse(result);
});
export const removeSediste = responseWrapper(async (req, res) => {
  const result = await DBBroker.getInstance().delete(
    new SedisteSchema({ idSedista: parseInt(req.params.idSedista) })
  );
  if (result.rowsAffected[0] === 0)
    return buildApiResponse("Ne postoji dato sediste", false, 404);
  return buildApiResponse(result);
});
export const patchSediste = responseWrapper(async (req, res) => {
  const { idSedista } = req.params;
  const { red, kolona } = req.body;
  const result = await DBBroker.getInstance().patch(
    new SedisteSchema({ idSedista: parseInt(idSedista) }, { red, kolona })
  );
  if (result.rowsAffected[0] === 0)
    return buildApiResponse("Ne postoji dato sediste", false, 404);
  return buildApiResponse(result);
});
