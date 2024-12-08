import { Router } from "express";
import pool from "../db/pool.js";

const deleteRouter = Router();

deleteRouter.post("/:id", async (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.admin === "true") {
            await pool.query(
                `DELETE FROM message
                            WHERE id = $1;`,
                [req.params.id],
            );

            return res.status(200).redirect("/");
        }
    }

    res.status(401).json({ error: "Not an Admin" });
});

export { deleteRouter };
