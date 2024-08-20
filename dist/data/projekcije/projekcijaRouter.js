import express from "express";
import { addProjekcije, deleteProjekcije, getProjekcija, getProjekcije, patchProjekcija, } from "./projekcijaController.js";
import { authenticateAdmin } from "../../middleware/authenticateToken.js";
export const projekcijaRouter = express.Router();
projekcijaRouter.get("/", getProjekcije);
projekcijaRouter.get("/:id", getProjekcija);
projekcijaRouter.post("/", authenticateAdmin, addProjekcije);
projekcijaRouter.delete("/:id", authenticateAdmin, deleteProjekcije);
projekcijaRouter.patch("/:id", authenticateAdmin, patchProjekcija);
//# sourceMappingURL=projekcijaRouter.js.map