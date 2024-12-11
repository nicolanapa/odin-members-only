import pool from "./pool.js";

const returnPostedDate = async () => {
    const { rows } = await pool.query("SELECT now();");
    const postedDate = rows[0].now;

    return postedDate;
};

const returnPostedDateFormatted = async () => {
    const unformattedDate = await returnPostedDate();
    const { rows } = await pool.query(
        "SELECT TO_CHAR(CAST($1 AS TIMESTAMP WITH TIME ZONE), 'DD/MM/YYYY HH24:MI:SS TZ');",
        [unformattedDate],
    );
    const postedDate = rows[0].to_char;

    console.log(unformattedDate, postedDate);

    return postedDate;
};

export { returnPostedDate, returnPostedDateFormatted };
