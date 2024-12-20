import express from "express";
import process from "process";
import url from "url";
import path from "path";
import pool from "./db/pool.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "./db/passport.js";
import { signUpRouter } from "./routes/signUpRouter.js";
import { joinRouter } from "./routes/joinRouter.js";
import { loginRouter } from "./routes/loginRouter.js";
import { createMessageRouter } from "./routes/createMessageRouter.js";
import { selectMessages } from "./db/selectMessages.js";
import { deleteRouter } from "./routes/deleteRouter.js";
import { modifyMessageRouter } from "./routes/modifyMessageRouter.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const pgSession = connectPgSimple(session);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: "username_sessions",
            createTableIfMissing: true,
        }),
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/styles")));
app.use(express.static(path.join(__dirname + "/icons")));
app.use(express.static(path.join(__dirname + "/scripts")));

app.get("/", async (req, res) => {
    const { rows } = await selectMessages();

    res.status(200).render("./home", { user: req.user, messages: rows });
});

app.use("/login", loginRouter);

app.use("/signUp", signUpRouter);

app.use("/join", joinRouter);

app.use("/createMessage", createMessageRouter);

app.use("/modifyMessage", modifyMessageRouter);

app.use("/delete", deleteRouter);

app.get("/styles/:file", (req, res) => {
    res.sendFile(__dirname + req.path);
});

app.get("/icons/:file", (req, res) => {
    res.sendFile(__dirname + req.path);
});

app.listen(PORT);
