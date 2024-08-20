import { DBBroker } from "../../db/dbBroker.js";
import {
  buildApiResponse,
  responseWrapper,
} from "../../utils/api-response-util.js";
import { ReziserSchema } from "./reziser.js";

export const getAllReziseri = responseWrapper(async (req, res, next) => {
  const result = await DBBroker.getInstance().select(new ReziserSchema());
  return buildApiResponse(result, true);
});
export const addReziser = responseWrapper(async (req, res, next) => {
  const reziser = req.body;
  const result = await DBBroker.getInstance().insertGeneric(
    new ReziserSchema(null, reziser)
  );
  return buildApiResponse(result, true);
});
export const deleteReziser = responseWrapper(async (req, res, next) => {
  const reziserId = parseInt(req.params.id);
  const result = await DBBroker.getInstance().delete(
    new ReziserSchema({ id: reziserId })
  );
  if (result.rowsAffected[0] === 0) {
    return buildApiResponse("Reziser ne postoji", false, 404);
  }
  return buildApiResponse(result, true);
});
export const updateReziser = responseWrapper(async (req, res, next) => {
  const reziserId = parseInt(req.params.id);
  const reziser = req.body;
  const result = await DBBroker.getInstance().patch(
    new ReziserSchema({ id: reziserId }, reziser)
  );
  if (result.rowsAffected[0] === 0) {
    return buildApiResponse("Reziser ne postoji", false, 404);
  }
  return buildApiResponse(result, true);
});
