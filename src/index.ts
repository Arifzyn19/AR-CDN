import express, { Request, Response } from "express";
import path from "path";
import { engine } from "express-handlebars";
import Handlebars from "handlebars";
import fileRouter from "./routers/fileRouter";

const app = express();
const port = process.env.PORT || 4321;

const hbs = engine({
  extname: "jmk",
  layoutsDir: path.join(__dirname, "../views/layouts"),
  partialsDir: path.join(__dirname, "../views/partials"),
});

Handlebars.registerHelper(
  "includes",
  function (str: string, substring: string) {
    return str.includes(substring);
  },
);

app.engine("jmk", hbs);
app.set("view engine", "jmk");
app.set("views", path.join(__dirname, "../views"));

app.use("/f", express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../public")));
app.use(fileRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});