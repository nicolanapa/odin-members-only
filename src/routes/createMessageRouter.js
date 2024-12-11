import { Router } from "express";
import { insertMessage } from "../db/insertMessage.js";
import { returnPostedDateFormatted } from "../db/postedDate.js";

const createMessageRouter = Router();

createMessageRouter.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).render("./createMessage", {
            user: req.user,
            posted_date: await returnPostedDateFormatted(),
        });
    } else {
        res.status(401).render("./login", {
            errors: [
                {
                    msg: "401 Unauthorized: Log in first before creating a new message",
                },
            ],
        });
    }
});

createMessageRouter.post("/", async (req, res) => {
    const { title, content } = req.body;

    if (req.isAuthenticated()) {
        await insertMessage(title, content, req.user.id);
    } else {
        res.status(401).redirect("/");

        return;
    }

    res.status(200).redirect("/");
});

export { createMessageRouter };
