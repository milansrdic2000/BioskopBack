import express from "express";
import { getFilmovi } from "./filmController.js";
export const filmRouter = express.Router();
filmRouter.get("/", getFilmovi);
//# sourceMappingURL=filmRouter.js.map