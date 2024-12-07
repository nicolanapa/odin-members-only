import pool from "./pool.js";

const insertMessage = async (title, content, usernameId) => {
    const { rows } = await pool.query("SELECT now();");
    const postedDate = rows[0].now;

    await pool.query(
        `
        INSERT INTO message (title, content, posted_date, username_id)
        VALUES ($1, $2, $3, $4);
        `,
        [title, content, postedDate, usernameId],
    );
};

export { insertMessage };
