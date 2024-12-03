import express from "express";
import process from "process";
import url from "url";
import path from "path";
import session from "express-session";
import passport from "passport";
import { signUpRouter } from "./routes/signUpRouter.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/styles")));
app.use(express.static(path.join(__dirname + "/scripts")));

app.get("/", (req, res) => {
    res.send("<h1>Home</h1>");
});

app.use("/signUp", signUpRouter);

app.listen(PORT);
