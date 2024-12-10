import { Router } from "express";
import passport from "../db/passport.js";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
    res.status(200).render("./login");
});

loginRouter.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login/failure",
    }),
);

loginRouter.get("/failure", (req, res) => {
    res.status(401).render("./login", {
        errors: [{ msg: "Email or Password are incorrect" }],
    });
});

export { loginRouter };
