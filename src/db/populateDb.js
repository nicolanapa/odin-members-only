import pool from "./pool.js";

const SQL = `
CREATE TABLE IF NOT EXISTS username (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT,
    membership_status TEXT DEFAULT 'newUser',
    admin TEXT DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS message (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT,
    content TEXT,
    posted_date TIMESTAMP WITH TIME ZONE,
    username_id INTEGER REFERENCES username(id)
);
`;

const main = async () => {
    console.log("Creating Tables...");

    await pool.query(SQL);

    console.log("Created");
};

main();
