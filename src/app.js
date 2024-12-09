import express from "express";
import process from "process";
import url from "url";
import path from "path";
import session from "express-session";
import passport from "./db/passport.js";
import { signUpRouter } from "./routes/signUpRouter.js";
import { joinRouter } from "./routes/joinRouter.js";
import { loginRouter } from "./routes/loginRouter.js";
import { createMessageRouter } from "./routes/createMessageRouter.js";
import { selectMessages } from "./db/selectMessages.js";
import { deleteRouter } from "./routes/deleteRouter.js";

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

app.get("/", async (req, res) => {
    const { rows } = await selectMessages();

    res.status(200).render("./home", { user: req.user, messages: rows });
});

app.use("/login", loginRouter);

app.use("/signUp", signUpRouter);

app.use("/join", joinRouter);

app.use("/createMessage", createMessageRouter);

app.use("/delete", deleteRouter);

app.get("/styles/:file", (req, res) => {
    res.sendFile(__dirname + req.path);
});

app.listen(PORT);
