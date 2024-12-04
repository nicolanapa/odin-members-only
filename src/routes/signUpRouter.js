import { Router } from "express";
import { body, validationResult } from "express-validator";

const passwordChecker = (value, { req }) => {
    return value === req.body.password;
};

const signUpValidator = [
    body("first_name")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("First Name Should Not Be Empty")
        .isAlpha()
        .withMessage("Only Characters Allowed in First Name"),
    body("last_name")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Last Name Should Not Be Empty")
        .isAlpha()
        .withMessage("Only Characters Allowed in Last Name"),
    body("email")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Email Should Not Be Empty")
        .isEmail()
        .withMessage("Email is not an email"),
    body("password")
        .notEmpty()
        .withMessage("Password Should Not Be Empty")
        .isLength({ min: 4, max: 96 })
        .withMessage("Password should have a length between 4 and 96"),
    body("confirmPassword")
        .notEmpty()
        .withMessage("Password Should Not Be Empty")
        .isLength({ min: 4, max: 96 })
        .withMessage("Password should have a length between 4 and 96")
        .custom(passwordChecker)
        .withMessage("Confirm Password isn't the same as Password"),
];

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
    res.status(200).render("./signUp");
});

signUpRouter.post("/", [
    signUpValidator,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array());

            res.status(400).render("./signUp", { errors: errors.array() });

            return;
        }

        res.status(200).redirect("/");
    },
]);

export { signUpRouter };
