import pool from "./pool.js";

const updateStatus = async (id, passcode) => {
    await pool.query(
        ` 
        UPDATE username
        SET membership_status = $1
        WHERE id = $2;
        `,
        [passcode, id],
    );
};

export { updateStatus };
