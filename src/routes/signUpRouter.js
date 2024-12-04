import { Router } from "express";
import { body } from "express-validator";

const signUpValidator = [
    body("first_name"),
    body("last_name"),
    body("email"),
    body("password"),
    body("confirmPassword"),
];

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
    res.status(200).render("./signUp");
});

signUpRouter.post("/", [
    signUpValidator,
    async (req, res) => {
        //
    },
]);

export { signUpRouter };
