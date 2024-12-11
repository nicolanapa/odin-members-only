import pool from "./pool.js";

const SQL = `
DROP TABLE message CASCADE;

DROP TABLE username CASCADE;
`;

const main = async () => {
    console.log("Deleting Tables...");

    await pool.query(SQL);

    console.log("Deleted");
};

main();
