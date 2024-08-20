import express from "express";
import { getAllZanrovi } from "./zanrController.js";
export const zanrRouter = express.Router();
zanrRouter.get("/", getAllZanrovi);
//# sourceMappingURL=zanrRouter.js.map