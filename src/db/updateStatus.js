import pool from "./pool.js";

const updateStatus = async (status, id) => {
    await pool.query(
        ` 
        UPDATE username
        SET membership_status = $1
        WHERE id = $2;
        `,
        [status, id],
    );
};

const updateAdmin = async (status, id) => {
    await pool.query(
        ` 
        UPDATE username
        SET admin = $1
        WHERE id = $2;
        `,
        [status, id],
    );
};

export { updateStatus, updateAdmin };
