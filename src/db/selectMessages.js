import pool from "./pool.js";

const selectMessages = async (limit = 50) => {
    await pool.query(
        `
        SELECT * FROM message
        LIMIT $1;
        `,
        [limit],
    );
};

export { selectMessages };
