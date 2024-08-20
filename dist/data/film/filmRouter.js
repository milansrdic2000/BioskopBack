import express from "express";
import { addFilm, deleteFilm, getFilm, getFilmovi, patchFilm, } from "./filmController.js";
import { authenticateAdmin, } from "../../middleware/authenticateToken.js";
export const filmRouter = express.Router();
filmRouter.get("/", getFilmovi);
filmRouter.get("/:id", getFilm);
filmRouter.post("/", authenticateAdmin, addFilm);
filmRouter.patch("/:id", authenticateAdmin, patchFilm);
filmRouter.delete("/:id", authenticateAdmin, deleteFilm);
//# sourceMappingURL=filmRouter.js.map