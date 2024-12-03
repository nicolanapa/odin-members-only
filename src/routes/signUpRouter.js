import { Router } from "express";

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
    res.status(200).render("./signUp");
});

export { signUpRouter };
