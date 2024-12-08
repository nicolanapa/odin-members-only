import pool from "./pool.js";

const selectMessages = async (limit = 50) => {
    return await pool.query(
        `
        SELECT message.*, TO_CHAR(posted_date, 'DD/MM/YYYY HH24:MI:SS TZ') AS posted_date, username.email FROM message
        INNER JOIN username
        ON message.username_id = username.id
        LIMIT $1;
        `,
        [limit],
    );
};

export { selectMessages };
