import { Router } from "express";
import { selectMessage } from "../db/selectMessages.js";
import pool from "../db/pool.js";

const modifyMessageRouter = Router();

modifyMessageRouter.get("/:id", async (req, res) => {
    if (req.isAuthenticated()) {
        const { rows } = await selectMessage(req.params.id);
        const message = rows[0];
        console.log(message);

        if (req.user.email == message.email || req.user.admin === "true") {
            res.status(200).render("./modifyMessage", {
                user: req.user,
                message: message,
            });
        } else {
            res.status(401).redirect("/");
        }
    } else {
        res.status(401).render("./login", {
            errors: [
                {
                    msg: "401 Unauthorized: Log in first before modifying a new message",
                },
            ],
        });
    }
});

modifyMessageRouter.post("/:id", async (req, res) => {
    const { title, content } = req.body;

    if (req.isAuthenticated()) {
        const { rows } = await selectMessage(req.params.id);
        const message = rows[0];
        console.log(message);

        if (req.user.email == message.email || req.user.admin === "true") {
            await pool.query(
                `
                UPDATE message
                SET title = $1, content = $2
                WHERE id = $3
                `,
                [title, content, req.params.id],
            );
        } else {
            res.status(401).redirect("/");
        }
    } else {
        res.status(401).render("./login", {
            errors: [
                {
                    msg: "401 Unauthorized: Log in first before modifying a new message",
                },
            ],
        });
    }

    res.status(200).redirect("/");
});

export { modifyMessageRouter };
