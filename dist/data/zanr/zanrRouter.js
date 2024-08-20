import express from "express";
import { addZanr, deleteZanr, getAllZanrovi, patchZanr, } from "./zanrController.js";
import { authenticateAdmin } from "../../middleware/authenticateToken.js";
export const zanrRouter = express.Router();
zanrRouter.get("/", getAllZanrovi);
zanrRouter.post("/", authenticateAdmin, addZanr);
zanrRouter.delete("/:id", authenticateAdmin, deleteZanr);
zanrRouter.patch("/:id", authenticateAdmin, patchZanr);
//# sourceMappingURL=zanrRouter.js.map