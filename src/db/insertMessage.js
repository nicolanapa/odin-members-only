import pool from "./pool.js";
import { returnPostedDate } from "./postedDate.js";

const insertMessage = async (title, content, usernameId) => {
    const postedDate = await returnPostedDate();

    await pool.query(
        `
        INSERT INTO message (title, content, posted_date, username_id)
        VALUES ($1, $2, $3, $4);
        `,
        [title, content, postedDate, usernameId],
    );
};

export { insertMessage };
