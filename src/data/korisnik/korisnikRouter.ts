import express from "express";
import {
  addKorisnik,
  deleteKorisnik,
  getAllKorisnici,
  patchKorisnik,
} from "./korisnikController.js";
import {
  authenticateAdmin,
  authenticateToken,
} from "../../middleware/authenticateToken.js";

export const korisnikRouter = express.Router();

korisnikRouter.get("/", authenticateAdmin, getAllKorisnici);
korisnikRouter.patch("/:id", authenticateToken, patchKorisnik);
korisnikRouter.delete("/:id", authenticateToken, deleteKorisnik);
korisnikRouter.post("/", addKorisnik);
