import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded, json } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import databaseRouter from "./routes/database.js";

const upload = multer();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(upload.array());

app.use(express.static(resolve(__dirname, "../client/build")));

app.use("/database", databaseRouter);

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname + "/../client/build/index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server started on port ${process.env.PORT || 5000}`);
});
