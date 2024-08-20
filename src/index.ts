import express, { Express, NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import sql from "mssql";
import { DBBroker } from "./db/dbBroker.js";
import { filmRouter } from "./data/film/filmRouter.js";
import { reziseriRouter } from "./data/reziser/reziserRouter.js";
import { zanrRouter } from "./data/zanr/zanrRouter.js";
import { notFoundMiddleware } from "./middleware/not-found-middleware.js";
import { errorHandler } from "./errors/error-handler.js";
import { adminRouter } from "./data/administrator/adminRouter.js";
import { korisnikRouter } from "./data/korisnik/korisnikRouter.js";
import { salaRouter } from "./data/sala/salaRouter.js";
import { projekcijaRouter } from "./data/projekcije/projekcijaRouter.js";
import { rezervacijaRouter } from "./data/rezervacija/rezervacijaRouter.js";
import { loginController } from "./data/login/loginController.js";
import dotenv from "dotenv";
import cors from "cors";
import { uploadController } from "./upload/uploadController.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { NotFound } = httpErrors;
const app: Express = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.post("/api/login", loginController);
app.use("/api/filmovi", filmRouter);
app.use("/api/reziseri", reziseriRouter);
app.use("/api/zanrovi", zanrRouter);
app.use("/api/administratori", adminRouter);
app.use("/api/korisnici", korisnikRouter);
app.use("/api/sale", salaRouter);
app.use("/api/projekcije", projekcijaRouter);
app.use("/api/rezervacije", rezervacijaRouter);
app.post("/api/upload", uploadController);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

console.log(path.join(__dirname, "uploads"));
app.use(
  "/uploads",
  express.static("/Users/milansrdic/Desktop/BioskopBack/uploads")
);

app.use(notFoundMiddleware);
app.use(errorHandler);

async function startDb() {
  await DBBroker.getInstance().openConnection();
}

app.listen(4000, async () => {
  // throw new Error('error 400 hilton')
  try {
    await startDb();
    console.log("Server is running on port 4000");
  } catch (err) {
    console.log("Error with starting server:");
    console.warn(err);
  }
});
