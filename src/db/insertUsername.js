import pool from "./pool.js";
import * as argon2 from "argon2";

const insertUsername = async (firstName, lastName, email, password) => {
    const hashedPassword = await argon2.hash(password);

    await pool.query(
        `
        INSERT INTO username
        (first_name, last_name, email, password, membership_status)
        VALUES
        ($1, $2, $3, $4, $5);
        `,
        [firstName, lastName, email, hashedPassword, "newUser"],
    );
};

export { insertUsername };
