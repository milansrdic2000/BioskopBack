import express from "express";
import { addRezervacija, deleteRezervacija, getRezervacije, patchRezervacija, } from "./rezervacijaController.js";
import { authenticateToken } from "../../middleware/authenticateToken.js";
export const rezervacijaRouter = express.Router();
rezervacijaRouter.get("/", authenticateToken, getRezervacije);
rezervacijaRouter.patch("/", authenticateToken, patchRezervacija);
rezervacijaRouter.post("/", authenticateToken, addRezervacija);
rezervacijaRouter.delete("/", authenticateToken, deleteRezervacija);
//# sourceMappingURL=rezervacijaRouter.js.map