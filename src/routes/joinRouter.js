import { Router } from "express";
import process from "process";
import { updateStatus, updateAdmin } from "../db/updateStatus.js";

const joinRouter = Router();

joinRouter.get("/", (req, res) => {
    res.status(200).render("./join");
});

joinRouter.post("/", async (req, res) => {
    if (!req.user) {
        return res.status(401).render("./join", { error: "Not logged in" });
    }
    
    if (req.body.passcode === process.env.SECRET_PASSWORD) {
        updateStatus("member", req.user.id);
    } else if (req.body.passcode === process.env.ADMIN_PASSWORD) {
        updateStatus("member", req.user.id);
        updateAdmin(true, req.user.id);
    } else {
        res.status(401).render("./join", { error: "Wrong passcode" });

        return;
    }

    res.status(200).redirect("/");
});

export { joinRouter };
