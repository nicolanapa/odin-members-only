import passport from "passport";
import LocalStrategy from "passport-local";
import * as argon2 from "argon2";
import pool from "./pool.js";

const customFields = {
    usernameField: "email",
    passwordField: "password",
};

passport.use(
    new LocalStrategy(customFields, async (email, password, done) => {
        console.log(email, password);

        const { rows } = await pool.query(
            "SELECT * FROM username WHERE email = $1",
            [email],
        );
        const user = rows[0];

        if (!user) {
            return done(null, false);
        }

        if (!(await argon2.verify(user.password, password))) {
            return done(null, false);
        }

        return done(null, user);
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const { rows } = await pool.query("SELECT * FROM username WHERE id = $1", [
        id,
    ]);
    const user = rows[0];

    done(null, user);
});

export default passport;
