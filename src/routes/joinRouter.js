import { Router } from "express";
import process from "process";
import { updateStatus } from "../db/updateStatus.js";

const joinRouter = Router();

joinRouter.get("/", (req, res) => {
    res.status(200).render("./join");
});

joinRouter.post("/", async (req, res) => {
    if (req.body.passcode === process.env.SECRET_PASSWORD) {
        updateStatus("member", 0);
    } else {
        res.status(401).render("./join", { error: "Wrong passcode" });
        
        return;
    }

    res.status(200).redirect("/");
});

export { joinRouter };
