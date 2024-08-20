import express from "express";
import { addAdministrator, deleteAdministrator, getAllAdministratori, patchAdministrator, } from "./administratorController.js";
import { authenticateAdmin } from "../../middleware/authenticateToken.js";
export const adminRouter = express.Router();
adminRouter.get("/", authenticateAdmin, getAllAdministratori);
adminRouter.post("/", authenticateAdmin, addAdministrator);
adminRouter.delete("/:id", authenticateAdmin, deleteAdministrator);
adminRouter.patch("/:id", authenticateAdmin, patchAdministrator);
//# sourceMappingURL=adminRouter.js.map