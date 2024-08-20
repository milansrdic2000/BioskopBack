import express from "express";
import {
  addSala,
  addSediste,
  deleteSala,
  getSala,
  getSale,
  patchSala,
  patchSediste,
  removeSediste,
} from "./salaController.js";
import { authenticateAdmin } from "../../middleware/authenticateToken.js";

export const salaRouter = express.Router();

salaRouter.get("/", getSale);
salaRouter.get("/:id", getSala);
salaRouter.post("/", authenticateAdmin, addSala);
salaRouter.post("/:id/sedista", authenticateAdmin, addSediste);
salaRouter.delete("/:id/sedista/:idSedista", authenticateAdmin, removeSediste);
salaRouter.patch("/:id/sedista/:idSedista", authenticateAdmin, patchSediste);
salaRouter.delete("/:id", authenticateAdmin, deleteSala);
salaRouter.patch("/:id", authenticateAdmin, patchSala);
