import express from "express";
import { addReziser, deleteReziser, getAllReziseri, } from "./reziserController.js";
export const reziseriRouter = express.Router();
reziseriRouter.get("/", getAllReziseri);
reziseriRouter.delete("/:id", deleteReziser);
reziseriRouter.post("/", addReziser);
//# sourceMappingURL=reziserRouter.js.map