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
        failureRedirect: "/",
    }),
);

export { loginRouter };
