import express from "express";
import { addReziser, deleteReziser, getAllReziseri, updateReziser, } from "./reziserController.js";
import { authenticateAdmin } from "../../middleware/authenticateToken.js";
export const reziseriRouter = express.Router();
reziseriRouter.get("/", getAllReziseri);
reziseriRouter.delete("/:id", authenticateAdmin, deleteReziser);
reziseriRouter.patch("/:id", authenticateAdmin, updateReziser);
reziseriRouter.post("/", authenticateAdmin, addReziser);
//# sourceMappingURL=reziserRouter.js.map